import pickle
'''
news_store.py

Example usage:
    front news_store import news_store
    
    store = news_store.get()
    print(store) # Prints {'news' = []}

    news = store['news']
    news.clear()
    
    news_store.set(news)
'''

'''
Example:
{
    "news": [
        {
            "meta": {
                "found": 222,
                "returned": 3,
                "limit": 3,
                "page": 1
            },
            "data": [
                {
                    "uuid": "489e4ec4-84a9-4628-966c-95c3741c6dfc",
                    "title": "Bitcoin Drops below $47K: Is BTC in a Bear Market?",
                    "description": "Bitcoin's rally seems to have made a sharp U-turn. Is this a short-lived correction or a longer-term trend?",
                    "keywords": "",
                    "snippet": "The market correction that many crypto analysts have been predicting for weeks seems to have finally arrived. Indeed, crypto markets are seeing red across the ...",
                    "url": "https://www.financemagnates.com/cryptocurrency/news/bitcoin-drops-below-47k-is-btc-in-a-bear-market/",
                    "image_url": "https://www.financemagnates.com/wp-content/uploads/2020/02/bitcoin-tightrope.jpg",
                    "language": "en",
                    "published_at": "2021-02-23T11:00:40.000000Z",
                    "source": "financemagnates.com",
                    "relevance_score": 106.05874,
                    "entities": [ ],
                    "similar": [ ]
                },
                {
                    "uuid": "61be555e-3120-44b0-ad13-6f985ea92f63",
                    "title": "Bitcoin ETFs vs Spot BTC",
                    "description": "Bitcoin is now the largest and most well-known cryptocurrency. This cryptocurrency has a market cap of several hundred billion dollars and as a result, has ...",
                    "keywords": "",
                    "snippet": "Bitcoin is now the largest and most well-known cryptocurrency. This cryptocurrency has a market cap of several hundred billion dollars and as a result, has mass...",
                    "url": "https://www.benzinga.com/markets/cryptocurrency/21/02/19808328/bitcoin-etfs-vs-spot-btc",
                    "image_url": "https://cdn.benzinga.com/files/imagecache/og_image_social_share_1200x630/images/story/2012/investing.jpg",
                    "language": "en",
                    "published_at": "2021-02-23T21:11:34.000000Z",
                    "source": "benzinga.com",
                    "relevance_score": 95.900276,
                    "entities": [ ],
                    "similar": [ ]
                },
                ...
            ]
        }
    ],
}
'''

initial_object = {
    'news': [],
}

class NewsStore:
    def __init__(self):
        self.__store = initial_object

    def get(self):
        return self.__store
    
    def set(self, store):
        if not isinstance(store, dict):
            raise TypeError('store must be of type dictionary')
        self.__store = store

    def clear_db(self):
        data = self.get()
        data['news'].clear()
        self.set(data)


print('Loading NewsStore...')

global news_store
news_store = NewsStore()

def save():
    data = news_store.get()
    with open('newsstore.p', 'wb') as FILE:
        pickle.dump(data, FILE)
    return {}