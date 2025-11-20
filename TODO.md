# TODO - Future Improvements

This document tracks planned improvements and enhancements for the `har-to-mermaid` library.

## Diagram Types

### Sequence Diagrams ✅ (Current)
- [x] Basic sequence diagram generation from HAR entries
- [x] Support for multiple participants/services
- [x] Request/response flow visualization
- [x] HTTP method and status code display

### Class Diagrams (Planned)
- [ ] Generate class diagrams from HAR API endpoints
- [ ] Extract resource structures from request/response bodies
- [ ] Identify relationships between resources
- [ ] Support for nested object structures
- [ ] Optional: Include data types and constraints

### State Diagrams (Future Consideration)
- [ ] Identify state transitions from HAR entries
- [ ] Track resource state changes across requests
- [ ] Visualize workflow states

## Enhanced Features

### Current Sequence Diagram Enhancements
- [ ] Support for request/response headers visualization
- [ ] Option to group requests by endpoint
- [ ] Support for WebSocket connections
- [ ] Error handling visualization (4xx, 5xx responses)
- [ ] Timing information display (request duration)
- [ ] Support for parallel requests

### Diagram Customization
- [ ] Theme support (different color schemes)
- [ ] Custom styling options
- [ ] Configurable participant names
- [ ] Option to show/hide request details
- [ ] Support for custom note annotations

### Input/Output Formats
- [ ] Support for multiple HAR format versions
- [ ] Export to different Mermaid diagram types
- [ ] Support for filtering HAR entries
- [ ] Option to merge multiple HAR files
- [ ] Support for incremental diagram updates

### Performance & Optimization
- [ ] Handle large HAR files efficiently
- [ ] Streaming support for very large files
- [ ] Memory optimization for big datasets
- [ ] Caching mechanisms for repeated processing

### Documentation & Examples
- [ ] More comprehensive examples
- [ ] API documentation improvements
- [ ] Best practices guide
- [ ] Integration examples with different tools

## Technical Improvements

### Code Quality
- [ ] Add TypeScript definitions
- [ ] Improve error handling and validation
- [ ] Add more comprehensive unit tests
- [ ] Add integration tests
- [ ] Performance benchmarking

### Developer Experience
- [ ] CLI tool for command-line usage
- [ ] Better error messages
- [ ] Progress indicators for large files
- [ ] Debug mode with verbose logging

## Integration Ideas

- [ ] Browser extension for direct HAR export
- [ ] Integration with Postman/Insomnia
- [ ] CI/CD pipeline integration
- [ ] Web service/API wrapper
- [ ] VS Code extension

## Notes

- Sequence diagrams are the current focus and are fully implemented
- Class diagrams are the next major feature to be implemented
- All features should maintain backward compatibility where possible
- Performance should be considered for all new features

