#!/usr/bin/python3
import json
import sys

filea=open("aparcamientos.json")
text=filea.read()
filea.close()
jsonap=json.loads(text)
var="organization-desc"
i=0
for aparcamiento in jsonap:
        i=i+1
        if(var in aparcamiento["organization"]):
            if(aparcamiento["organization"][var]==""):
                print(aparcamiento["title"])
        else:
            print(aparcamiento["title"])
