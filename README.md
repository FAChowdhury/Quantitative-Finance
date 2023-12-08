# Quantitative-Finance

<h2>Requirements</h2>

<p>Run 'pip3 install Flask' in the backend once</p>
<p>Run 'npm install' in the frontend once</p>
<p>Run 'pip3 install pandas' in the backend once</p>
<p>To start the backend server, run 'source venv/bin/activate' in the backend </p> 
<p>Then run 'python3 server.py' in the backend</p>
<p>To start the frontend server, run 'npm start' in the backend</p>
<br>
<p>
  If you get errors with urllib3, do the following:
  `pip uninstall urllib3`
  `pip install 'urllib3<2.0'`
</p>

<h2>Specification</h2>

<h3>Backend</h3>
<hr>

<h4>API</h4>

|    Route           |  Methods  |  Return                                                                                                                 |
|--------------------|-----------|-------------------------------------------------------------------------------------------------------------------------|
| `/summary/<stock>` |   `GET`   | `{Stock, Last_Price, Change, Percentage_Change}`                                                                        |
| `/news/all`        |   `GET`   | `{meta: {}, data: []}`, for more information, visit <a href="https://www.marketaux.com/documentation">Marketaux Docs</a>|



<h3>Frontend</h3>
<hr>
