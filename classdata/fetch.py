import urllib.request
import os


def fetch_from_unitime(link, filename):
    urllib.request.urlretrieve(link, filename)