from flask import Flask, request, jsonify
from flask_cors import CORS
from joblib import load

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

@app.route('/', methods=['GET', 'POST'])
def hello_world():
    if request.method == 'POST':
        clf = load('sentiment_logistic_regression_model.joblib') 
        tfidf_vectorizer = load('sentiment_tfidf_vectorizer.joblib')
        
        data = request.json
        title = data.get('title', '')
        about = data.get('about', '')

        sentence_tfidf = tfidf_vectorizer.transform([title + about])
        probabilities = clf.predict_proba(sentence_tfidf)
        prob = "sentiment score: " + str(probabilities[0][1])
        return jsonify({'title': prob})
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)