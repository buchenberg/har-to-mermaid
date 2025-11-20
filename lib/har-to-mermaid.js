var URL = require('url');

/**
 * HarToMermaid - Convert HAR log entries to Mermaid sequence diagrams
 */
function HarToMermaid() {}

/**
 * Generate Mermaid sequence diagram from HAR log (synchronous)
 * @param {Object} harLog - HAR log object with entries array
 * @param {Object} options - Optional configuration
 * @returns {String} Mermaid diagram text
 */
HarToMermaid.generate = function(harLog, options) {
  options = options || {};
  
  if (!harLog || !harLog.entries || !Array.isArray(harLog.entries)) {
    throw new Error('Invalid HAR log: must have an entries array');
  }

  var mermaidText = 'sequenceDiagram\n';
  mermaidText += '    participant UA as "User Agent"\n';
  
  // Collect unique services first
  var serviceMap = {};
  var serviceIndex = 0;
  
  for (var i = 0; i < harLog.entries.length; i++) {
    var entry = harLog.entries[i];
    if (!entry || !entry.request || !entry.request.url) {
      continue;
    }
    
    var requestUrlObj = URL.parse(entry.request.url);
    var serviceName = entry['x-service-name'] || 
                     requestUrlObj.hostname || 
                     requestUrlObj.pathname || 
                     'Service';
    
    // Normalize service name
    serviceName = serviceName.replace(/^\/+|\/+$/g, ''); // Remove leading/trailing slashes
    if (!serviceName) serviceName = 'Service';
    
    if (!serviceMap[serviceName]) {
      serviceMap[serviceName] = 'S' + serviceIndex;
      mermaidText += '    participant S' + serviceIndex + ' as "' + serviceName + '"\n';
      serviceIndex++;
    }
  }
  
  mermaidText += '\n';
  
  // Generate sequence
  for (var i = 0; i < harLog.entries.length; i++) {
    var entry = harLog.entries[i];
    if (!entry || !entry.request || !entry.request.url || !entry.response) {
      continue;
    }
    
    var requestUrlObj = URL.parse(entry.request.url);
    var serviceName = entry['x-service-name'] || 
                     requestUrlObj.hostname || 
                     requestUrlObj.pathname || 
                     'Service';
    
    // Normalize service name
    serviceName = serviceName.replace(/^\/+|\/+$/g, '');
    if (!serviceName) serviceName = 'Service';
    
    var serviceId = serviceMap[serviceName] || 'S0';
    var resourceName = entry['x-resource-name'] || 
                      (requestUrlObj.pathname ? requestUrlObj.pathname.split("/").pop() : null) || 
                      'resource';
    var method = entry.request.method ? entry.request.method.toLowerCase() : 'get';
    var resStatus = entry.response.status || 200;
    
    var resStatusText = '';
    if (resStatus !== 200) {
      resStatusText = ' ' + (entry.response.statusText || '');
    }

    // Query params
    var queryParams = '';
    if (entry.request.queryString && Array.isArray(entry.request.queryString)) {
      for (var q = 0; q < entry.request.queryString.length; q++) {
        var qParam = entry.request.queryString[q];
        if (qParam && qParam.name) {
          queryParams += qParam.name + ', ';
        }
      }
    }
    
    // Path params
    var pathParams = '';
    if (entry.request['x-path-params'] && Array.isArray(entry.request['x-path-params'])) {
      for (var p = 0; p < entry.request['x-path-params'].length; p++) {
        var pParam = entry.request['x-path-params'][p];
        if (pParam && pParam.name) {
          pathParams += pParam.name + ', ';
        }
      }
    }

    var allParams = (queryParams + pathParams).replace(/,\s*$/, '');
    var methodName = method + resourceName.charAt(0).toUpperCase() + resourceName.slice(1);
    var paramsStr = allParams ? '(' + allParams + ')' : '()';
    
    // Request message
    mermaidText += '    UA->>' + serviceId + ': ' + methodName + paramsStr + '\n';
    
    // Note
    if (requestUrlObj.pathname) {
      mermaidText += '    Note right of ' + serviceId + ': ' + requestUrlObj.pathname + '\n';
    }
    
    // Response message
    mermaidText += '    ' + serviceId + '-->>UA: ' + resStatus + '(' + resourceName + resStatusText + ')\n';
  }
  
  return mermaidText;
};

/**
 * Generate Mermaid sequence diagram from HAR log (async with callback)
 * @param {Object} harLog - HAR log object with entries array
 * @param {Function} callback - Callback function(err, result)
 * @param {Object} options - Optional configuration
 */
HarToMermaid.generateAsync = function(harLog, callback, options) {
  // Handle case where options is omitted
  if (typeof callback === 'object' && !options) {
    options = callback;
    callback = null;
  }
  
  try {
    var mermaidText = this.generate(harLog, options);
    
    if (typeof callback === 'function') {
      callback(null, { mermaid: mermaidText });
    }
  } catch (err) {
    if (typeof callback === 'function') {
      callback(err, null);
    } else {
      throw err;
    }
  }
};

module.exports = HarToMermaid;

