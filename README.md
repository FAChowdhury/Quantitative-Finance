# Quantitative-Finance

<h2>Possible Issues</h2>
<br>
<p>
  If you get errors with urllib3, do the following:
  `pip uninstall urllib3`
  `pip install 'urllib3<2.0'`
</p>

<h2>Specification</h2>

<h3>Backend</h3>
<hr>
<p>Run 'pip3 install Flask' in the backend once</p>
<p>Run 'pip3 install yfinance' in the backend once</p>
<p>To start the backend server, run 'source venv/bin/activate' in the backend </p> 
<p>Then run 'python3 server.py' in the backend virtual environment</p>
<h4>API</h4>

|    Route           |  Methods  |  Return                                                                                                                 |
|--------------------|-----------|-------------------------------------------------------------------------------------------------------------------------|
| `/summary/<stock>` |   `GET`   | `{Stock, Last_Price, Change, Percentage_Change}`                                                                        |
| `/news/all`        |   `GET`   | `{meta: {}, data: []}`, for more information, visit <a href="https://www.marketaux.com/documentation">Marketaux Docs</a>|
| `/isValid/<stock>` |   `GET`   | `boolean`                                                                                                               |



<h3>Frontend</h3>
<hr>
<p>Run 'npm install' in the frontend once</p>
<p>To start the frontend server, run 'npm start' in the frontend</p>
