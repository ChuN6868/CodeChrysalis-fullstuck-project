# CodeChrysalis-fullstuck-project

## セットアップ手順
### cloneする
作業用のディレクトリで下記のコマンドを実行
```
git clone https://github.com/ChuN6868/CodeChrysalis-fullstuck-project.git
```

### .env.localファイルの作成
./server/.env.templateのファイル名を.env.localに修正し、下記のように設定する
```
DB_USER=<Postgresのユーザー名>
DB_PASSWORD=<Postgresのパスワード>
DB_NAME=<PostgresのDB名>
PORT=<ポート番号 //特に問題なければ3000番>
```

### サーバーの立ち上げ
- server
下記のコマンドを実行
```
cd ./server
npm install
node server.js
```

- frontend
下記のコマンドを実行
```
cd ./frontend
npm install
npm run dev
```
http://localhost:5173 にアクセス


## アプリの概要

## リソース

## 将来の展望

# ( ..)φメモメモ（以下後学のため）
フロントエンドとバックエンドでディレクトリを分けた<br>
フロントエンド：frontend<br>
バックエンド：server<br>

/frontend<br>
  ├── /node_modules<br>
  ├── /public<br>
  ├── /src<br>
  │&emsp;&emsp;├── /assets       // 画像やスタイルシート（CSS、Sassなど）を格納するフォルダ<br>
  │&emsp;&emsp;│&emsp;&emsp;├── /css      // cssを格納<br>
  │&emsp;&emsp;│&emsp;&emsp;├── /images   // 画像ファイルを格納<br>
  │&emsp;&emsp;├── /components   // 再利用可能なUIコンポーネントを格納するフォルダ<br>
  │&emsp;&emsp;├── App.jsx<br>
  │&emsp;&emsp;├── main.jsx<br>
  ├── .gitignore<br>
  ├── eslint.config.js<br>
  ├── index.html<br>
  ├── package-lock.json<br>
  ├── package.json<br>
  ├── README.md<br>
  └── vite.config.js<br>

/server<br>
  ├── /db<br>
  │&emsp;&emsp;├── /migrations<br>
  │&emsp;&emsp;├── /seeds<br>
  │&emsp;&emsp;├── knex.js<br>
  ├── /node_modules<br>
  ├── /routes<br>
  ├── /tests<br>
  ├── .env.local<br>
  ├── .gitignore<br>
  ├── knexfile.js<br>
  ├── package-lock.json<br>
  ├── package.json<br>
  └── server.js<br>


## フロントエンドの構築(create-viteを使用した場合→jsxの拡張子になる)
プロジェクトのルートディレクトリで'npx create-vite@latest <プロジェクト名> --template react'を実行<br>
```
cd ./<プロジェクト名><br>
npm install<br>
npm install axios<br>
```
を実行。npm run devでサーバーを起動できるようになる。<br>

## フロントエンドの構築(create-reacrを使用した場合→jsの拡張子になる)
プロジェクトのルートディレクトリで'npx create-react-app react-app'を実行
./react-app/src/App.jsを下記のように記述
→バックエンドの/api/helloというAPIを呼び出す

```
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // バックエンドAPIを呼び出す
    axios.get('http://localhost:5000/api/hello')
      .then(response => setMessage(response.data.message))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}

export default App;
```

## バックエンド（Node.js + Express）の構築
serverディレクトリに移動して次のコマンドを実行
```
npm init -y
npm install express cors
```

serverディレクトリ内にserver.jsを作成し下記のように記述
→/api/helloというエンドポイントが動作するようになる
```
const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

// CORSを有効にする（フロントエンドとバックエンドが異なるポートで動作するため）
app.use(cors());

// 簡単なAPIエンドポイント
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello World from the server!' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
```

## 各サーバーの起動
バックエンド：
```
cd ./server
node server.js
```

フロントエンド：
```
cd ./react-app
npm start

もしくは、

cd ./frontend
npm run dev
```
→起動後、http://localhost:3000でフロントが動作する

## DBの環境構築
バックエンドでknexを用いてDBとサーバーを接続する
```
cd ./server
npm install knex pg dotenv
```

./server/.env.localを作成し、下記のように記述
```
DB_USER=(各自で設定)
DB_PASSWORD=(各自で設定)
DB_NAME=react_app
PORT=3000
```

./server/db/knex.jsを作成し、下記のように記述
```
const knex = require('knex');
const knexConfig = require('../knexfile')

const environment = process.env.NODE_ENV || 'development'

module.exports = knex(knexConfig[environment]);
```

./server/knexfile.jsを作成し、下記のように記述
```
require('dotenv').config({ path: './.env.local' })

// process.env.DB_NAME のように記述すればアクセスできるようになる

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: process.env.DB_NAME,
      user:     process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  }

};
```

./server/server.jsを下記のように修正
```
const express = require('express')
const cors = require('cors')

const app = express();
const port = 5000;

const knex = require('./db/knex')

app.use(cors());
app.use(express.json());

// serverとReactでのHello World用
// app.get('/api/hello', (req, res) => {
//     res.json({ message: 'Hello World from the server!' });
// });

// DBからデータを取得して返すエンドポイント
app.get('/api/message', async (req, res) => {
    try {
        const message = await knex('message').select('*')
        console.log(message)
        res.status(200).json(message);
    } catch (err) {
        console.log(err.stack)
        res.status(500).json({ error: 'Failed to get todos'})
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
```

### migrateファイルの作成
下記のコマンドを実行
```
cd ./server
npx knex migrate:make create_message_table
```

./server/db/migrationsにmigrateファイルが作成されるので下記のように記述
```
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('messages', (table) => {
        table.increments('id').primary();
        table.string('content');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('messages');
};
```

package.jsonのscript内に下記のコードを追記し、npm run migrateを実行するとテーブルが作成される
```
"migrate": "knex migrate:latest"
```
＊DB内にknex_migrationsというテーブルがあり、この中に不要なmigrateファイルが残っているとエラーになる
→delete文で削除すれば解決する

### seederファイルの作成
下記のコマンドを実行
```
cd ./server
npx knex seed:make initial_messages --timestamp-filename-prefix
```

./server/db/seedsにseederファイルが作成されるので下記のように記述
```
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('messages').del()
  await knex('messages').insert([{ content: 'Content 1' }, { content: 'Content 2' }, { content: 'Content 3' }])
};
```

package.jsonのscript内に下記のコードを追記し、npm run seedを実行するとテーブルが作成される
```
"seed": "knex seed:run"
```

### フロント側の修正
./react-app/src/App.jsのuseEffectを下記のように修正
```
function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Hello WorldのバックエンドAPIを呼び出す
    // axios.get('http://localhost:5000/api/hello')
    //   .then(response => setMessage(response.data.message))
    //   .catch(error => console.error('Error fetching data:', error));

    // DBからmessageを取得するAPI
    // fetch('http://localhost:5000/api/message')
    axios.get("http://localhost:5000/api/message")
      .then((response) => setMessage(response.data.message))
      .catch(error => console.error("DBからのデータ取得でエラー発生", error))
  }, []);
```
