from appwrite.client import Client
from appwrite.services.databases import Databases
from datetime import date, timedelta
from json import dumps
from random import randrange

# print(int(datetime.now().strftime("%s%f")) / 1000)

client = Client()

(client
  .set_endpoint('https://cloud.appwrite.io/v1') # Your API Endpoint
  .set_project('648a3540157c9ea48f69') # Your project ID
  .set_key('f055701e3df341b08aed3bf12916682293b83406d55b01b20659a8f7db61166aaa7e588a91f12147a27cfd8a3cfb53ff3fbbad222247554a1dd85490b89700c7d2fdddf5e8c5182011bd0f5348e62adfd8cd218f6187a6e1ed63f6b8ae482425187b1c2aba622f2b547692b193668434cb18d094d3bac54432ee96b274e4618f') # Your secret API key
)

databases = Databases(client)

result = databases.create_document('648a38ace80fa8b51a77', '648a38b0c47f74084842', '648a3c1413cbd035fd92', {
    'email': 'example@gmail.com',
    'name': 'Shreesh',
    'moods': [''],
    'journal': ''
})

moods = []

for i in range(30):
    stamp = int((date.today() - timedelta(days=30 - i)).strftime("%s%f")) / 1000
    data = {
        'happy': randrange(20, 100),
        'angry': randrange(20, 100),
        'anxious': randrange(20, 100),
        'neutral': randrange(20, 100),
        'stamp': stamp
    }
    moods.append(dumps(data))

databases.update_document('648a38ace80fa8b51a77', '648a38b0c47f74084842', '648a3c1413cbd035fd92', {
    'moods': moods
})
1684175400000.0
