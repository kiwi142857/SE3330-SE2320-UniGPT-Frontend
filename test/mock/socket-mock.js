const getMockWebSocket = function () {
    var WebSocket = jasmine.createSpy();
    WebSocket.and.callFake(function (url) {
      socketMock = {
        url: url,
        readyState: WebSocket.CONNECTING,
        send: jasmine.createSpy(),
        close: jasmine.createSpy().and.callFake(function () {
          socketMock.readyState = WebSocket.CLOSING;
        }),

        // methods to mock the internal behaviour of the real WebSocket
        _open: function () {
          socketMock.readyState = WebSocket.OPEN;
          socketMock.onopen && socketMock.onopen();
        },
        _message: function (msg) {
          socketMock.onmessage && socketMock.onmessage({data: msg});
        },
        _error: function () {
          socketMock.readyState = WebSocket.CLOSED;
          socketMock.onerror && socketMock.onerror();
        },
        _close: function () {
          socketMock.readyState = WebSocket.CLOSED;
          socketMock.onclose && socketMock.onclose();
        }
      };
      return socketMock;
    });
    WebSocket.CONNECTING = 0;
    WebSocket.OPEN = 1;
    WebSocket.CLOSING = 2;
    WebSocket.CLOSED = 3;
    windowMock = {
      WebSocket: WebSocket
    };

    return WebSocket;
}