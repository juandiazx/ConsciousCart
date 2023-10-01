from flask import Flask, request, jsonify
from flask_cors import CORS
from joblib import load
from biodegradable import calculate_normalized_good_score_and_list_materials
from harmscore import calculate_normalized_harmfulness_score_and_list_materials
from brandscore import brand_score

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

@app.route('/', methods=['GET', 'POST'])
def hello_world():
    if request.method == 'POST':
        try:
            data = request.get_json(force=True)  # Explicitly set content type
            text_content = ''
            if data.get('title', '') != '':
                title = data.get('title', '')
                about = data.get('about', '')
                text_content = title + about
            else:
                text_content = data.get('description', '')

            clf = load('sentiment_logistic_regression_model.joblib')
            tfidf_vectorizer = load('sentiment_tfidf_vectorizer.joblib')

            sentence_tfidf = tfidf_vectorizer.transform([text_content])
            probabilities = clf.predict_proba(sentence_tfidf)
            sent_score = probabilities[0][1]
            bio_score, materials = calculate_normalized_good_score_and_list_materials(text_content)
            harm_score, chemicals = calculate_normalized_harmfulness_score_and_list_materials(text_content)
            env = sent_score * 2.5
            if env >= 1:
                env = 0.99
            safety = bio_score - 2*harm_score
            if safety <= -2:
                safety = 0.2
            elif safety <= -1:
                safety = 0.3
            elif safety <= 0:
                safety = 0.45
            elif safety <= 1:
                safety = 0.55
            elif safety <= 2:
                safety = 0.65
            elif safety <= 3:
                safety = 0.75
            elif safety <= 4:
                safety = 0.85
            else:
                safety = 0.95
            env = int(env * 100)
            safety = int(safety * 100)
            return jsonify({'env_score': env, 'safety_score': safety})
        except Exception as e:
            return jsonify({'error': str(e)}), 500  # Return the error message with 500 status code

    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)
