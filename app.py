# フォルダからファイルをとってくるやつ
import os
import sqlite3
from flask import Flask, render_template, request, redirect, session


# splite3をimportする
# flaskをimportしてflaskを使えるようにする
# appにFlaskを定義して使えるようにしています。Flask クラスのインスタンスを作って、 app という変数に代入しています。
app = Flask(__name__)
# ここを入れる

# Flask では標準で Flask.secret_key を設定すると、sessionを使うことができます。この時、Flask では session の内容を署名付きで Cookie に保存します。

app.secret_key = ''


@app.route('/')
def index():
    return render_template('base2.html')

@app.route('/phone')
def index_b():
    return render_template('base.html')


# アルバム機能
@app.route('/album')
def indexa():
    return render_template('album.html')

# 登録機能
@app.route('/regist')
def regist_get():
    if "user_id" in session:
        return redirect("/")
    else:
        return render_template('regist.html')

@app.route('/regist', methods=['POST'])
def regist_post():
    name = request.form.get("member_name")
    password = request.form.get("member_password")
    conn = sqlite3.connect('collage.db')
    c = conn.cursor()
    # 追加なのでinsert into
    c.execute("insert into users values(null, ?, ?)",(name, password))
    conn.commit()
    c.close()
    # null で勝手に数字が入ってくる
    return "登録完了(^^)"

# ログイン機能
@app.route('/login')
def login():
    return render_template('login.html')

# 編集画面
@app.route('/edit')
def edit():
    return render_template('edit.html')

@app.errorhandler(404)
def notfound(code):
    return "404ページだよ"

if __name__ == '__main__':
    app.run(debug=True)
    # サーバにアップするときはdebug=tureを消す
