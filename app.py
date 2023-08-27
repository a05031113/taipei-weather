from flask import *

app = Flask(
    __name__,
    static_folder="./static",
)

@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000, debug=True)