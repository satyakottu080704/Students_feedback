from flask import Flask, render_template, request, redirect
import mysql.connector
from config import db_config

app = Flask(__name__)  

def get_db_connection():
    return mysql.connector.connect(**db_config)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/feedback', methods=['GET', 'POST'])  # ✅ Fix: 'method' ➝ 'methods'
def feedback():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        comment = request.form['comment']

        conn = get_db_connection()
        cursor = conn.cursor()
        # ✅ Fix: Use %s (lowercase), not %S (uppercase)
        cursor.execute('INSERT INTO feedback (student_name, email, comment) VALUES (%s, %s, %s)', 
                       (name, email, comment))
        conn.commit()
        conn.close()
        return redirect('/')
    return render_template('feedback.html')

@app.route('/admin')
def admin():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM feedback ORDER BY submitted_at DESC')
    feedbacks = cursor.fetchall()
    conn.close()
    return render_template('admin.html', feedbacks=feedbacks)

if __name__ == '__main__':
    app.run(debug=True)
