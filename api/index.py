from server.app import app

def handler(request):
    """Handle requests in a serverless context."""
    return app 