from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

@app.route("/run", methods=["POST"])
def run_command():
    data = request.json
    command = data.get("command", "")
    result = subprocess.run(command, shell=True, capture_output=True, text=True, timeout=30)
    return jsonify({"stdout": result.stdout, "stderr": result.stderr, "returncode": result.returncode})

if __name__ == "__main__":
    app.run(port=5000)