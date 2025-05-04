from server.app import app  # Make sure this is pointing to your app instance

def handler(request):
    """Handle requests in a serverless context."""
    with app.request_context(request):
        response = app.full_dispatch_request()
    return response