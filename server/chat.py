# -*- coding: utf-8 -*-

import gevent
import random
from time import sleep
from flask import Flask
from flask_sockets import Sockets


app = Flask(__name__)

sockets = Sockets(app)

GPlusIds = [
  "108086881826934773478",
  "103846222472267112072",
  "102590783040593125503",
  "102354824581711724695",
  "112983617936169928992",
  "112679372199672801713",
  "115785601687445616629",
  "117973833118225220737",
  "115396249721073778311",
  "108853143961240003549",
  "117826637077711958172",
  "110804953626559077511"
  ]


class ChatBackend(object):
    """Interface for registering and updating WebSocket clients."""

    def __init__(self):
        self.clients = list()

    def register(self, client):
        print "NEW USER"
        self.clients.append(client)

    def send(self, client, data):
        try:
            client.send(data)
        except Exception:
            print "USER DISCONNECTED"
            self.clients.remove(client)

    def run(self):
        while 1:
            sleepTime = random.randint(1,10)
            sleep(sleepTime)
            message = random.choice(GPlusIds)
            if len(self.clients)>0:
                print "Dormido durante:", sleepTime, "segundos. Enviando id:", message, "a", len(self.clients), "usuario(s)."
            for client in self.clients:
                gevent.spawn(self.send, client, message)

    def start(self):
        gevent.spawn(self.run)

chats = ChatBackend()
chats.start()

@sockets.route('/users')
def outbox(ws):
    chats.register(ws)
    while not ws.closed:
        gevent.sleep(0.1)

