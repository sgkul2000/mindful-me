import urllib.request
from deepface import DeepFace

def deepFace(req, res):
    data = req.payload
    data_url = data['data_url']
    response = urllib.request.urlopen(data_url)
    id = "images/" + str(uuid4()) + ".jpeg"
    with open(id, 'wb') as file:
        file.write(response.file.read())
    try:
        face_analysis = DeepFace.analyze(id)
        return res.json(face_analysis)
    except Exception as e:
        return str(e), 503
