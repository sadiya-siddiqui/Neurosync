from flask import Flask, request, jsonify
from textblob import TextBlob

app = Flask(__name__)

def predict_stress(text):
    sentiment = TextBlob(text).sentiment.polarity

    if sentiment < -0.5:
        return "High"
    elif sentiment < 0:
        return "Medium"
    else:
        return "Low"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    text = data.get("text", "")

    stress = predict_stress(text)

    suggestions = {
        "Low": "You're doing great!",
        "Medium": "Take short breaks.",
        "High": "Try deep breathing or talk to someone."
    }

    return jsonify({
        "stress": stress,
        "suggestion": suggestions[stress]
    })

app.run(port=5000)