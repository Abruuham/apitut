import re
import string
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

def display_tweets():
    print(os.path.dirname(__file__))
    with open('C:\\Users\\abrah\\Documents\\test-api\\template\\home.html', 'r') as f:
        lines = f.readlines()
        soup = Soup('<div class="post"></div>')

        for i, line in enumerate(lines[1::]):
            new_tag = soup.new_tag('p', **{'class':'none'})
            new_tag.string = line
            soup.append(new_tag)
        print(soup)
    return




app.run(host='localhost', port=5000)
