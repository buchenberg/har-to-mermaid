var h2m = require('../index.js');

// Test 1: Basic HAR log
console.log('Test 1: Basic HAR log');
var harLog1 = {
  entries: [
    {
      request: {
        method: 'GET',
        url: 'https://api.example.com/users'
      },
      response: {
        status: 200,
        statusText: 'OK'
      }
    }
  ]
};

try {
  var result1 = h2m.generate(harLog1);
  console.log('✓ Test 1 passed');
  console.log(result1);
  console.log('\n');
} catch (err) {
  console.error('✗ Test 1 failed:', err.message);
}

// Test 2: Multiple services
console.log('Test 2: Multiple services');
var harLog2 = {
  entries: [
    {
      request: {
        method: 'GET',
        url: 'https://api.example.com/users'
      },
      response: {
        status: 200,
        statusText: 'OK'
      }
    },
    {
      request: {
        method: 'POST',
        url: 'https://auth.example.com/login'
      },
      response: {
        status: 200,
        statusText: 'OK'
      }
    }
  ]
};

try {
  var result2 = h2m.generate(harLog2);
  console.log('✓ Test 2 passed');
  console.log(result2);
  console.log('\n');
} catch (err) {
  console.error('✗ Test 2 failed:', err.message);
}

// Test 3: Async callback
console.log('Test 3: Async callback');
h2m.generateAsync(harLog1, function(err, result) {
  if (err) {
    console.error('✗ Test 3 failed:', err.message);
  } else {
    console.log('✓ Test 3 passed');
    console.log(result.mermaid);
    console.log('\n');
  }
});

// Test 4: Invalid input
console.log('Test 4: Invalid input');
try {
  h2m.generate(null);
  console.error('✗ Test 4 failed: should have thrown error');
} catch (err) {
  console.log('✓ Test 4 passed: correctly threw error for invalid input');
  console.log('  Error:', err.message);
}

console.log('\nAll tests completed!');

