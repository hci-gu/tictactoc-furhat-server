from flask import Flask
from flask import request
from flask import jsonify
import socket

### Some global settings/variables used
IP = "host.docker.internal"
UDP_PORT = 8089 # iMotions external API

def sendudp(message):
    sock=socket.socket(socket.AF_INET,socket.SOCK_DGRAM)
    sock.sendto(bytes(message,"utf-8"),(IP, UDP_PORT))

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World from Flask in a uWSGI Nginx Docker container with \
     Python 3.8 (from the example template)"

@app.route('/imotions/start', methods=['GET'])
def imotions_start():
    sendudp("M;2;;;[StimNumber];;S;I\r\n")
    return "started"

@app.route('/imotions/stop', methods=['GET'])
def imotions_stop():
    sendudp("M;2;;;[StimNumber];;E;\r\n")
    return "stopped"

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=80)
