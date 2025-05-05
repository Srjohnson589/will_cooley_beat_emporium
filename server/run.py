from app import app

if __name__ == "__main__":
  # for deployment - remove debug true
  app.run(host="0.0.0.0", port=5000, debug=True)

# The handler function for serverless environment
def handler(request):
    """Handle requests in a serverless context."""
    with app.request_context(request):
        response = app.full_dispatch_request()
    return response