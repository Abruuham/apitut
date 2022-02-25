
from app import app
from db import mysql
from flask import jsonify, flash, request, render_template, redirect, url_for
from datetime import date
from bs4 import BeautifulSoup as Soup
import os

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/tweet', methods = ['POST'])
def post():
    tweet = request.form['tweet']
    cursor = mysql.connection.cursor()
    cursor.execute(''' INSERT INTO tweets(tweet, tweet_author, tweet_date) VALUES(%s, %s, %s) ''', (tweet, "john", date.today()))
    mysql.connection.commit()
    cursor.close()
    return redirect(url_for('home'))

@app.route('/get_updates', methods=['GET'])
def get_updates():
    cursor = mysql.connection.cursor()
    cursor.execute(''' SELECT * FROM tweets''')
    row = cursor.fetchall()
    tweets = []
    for i, tweet in enumerate(row):
        tweets.append({
            'tweet_id': tweet[0],
            'tweet': tweet[1],
            'tweet_author':tweet[2],
            'tweet_date': tweet[3]
        })
    resp = jsonify(tweets)
    resp.status_code = 200
    # display_tweets()
    return resp


@app.route("/delete/<int:tweet_id>", methods=['DELETE'])
def delte_tweet(tweet_id):
    id = int(tweet_id)
    print(id)
    cursor = mysql.connection.cursor()
    cursor.execute(''' DELETE FROM tweets WHERE tweet_id =%s ''', [id])
    mysql.connection.commit()
    cursor.close()
    return redirect(url_for('home'))

app.run(host='127.0.0.1', port=5000)
