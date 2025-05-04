from app import app

if __name__ == "__main__":
  # for deployment - remove debug true
  app.run(port=5555, debug=True)
