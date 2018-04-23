import sys
import RPi.GPIO as GPIO
import dht11
from time import sleep


def setup():
    GPIO.setwarnings(False)
    GPIO.setmode(GPIO.BCM)				# GPIO Numbering
    # read data using pin 14
    instance = dht11.DHT11(pin = 14)
    result = instance.read()
    return instance, result

def destroy():
    #GPIO.output(Motor1E, GPIO.LOW) # motor stop
    GPIO.cleanup()

def returnTemp():
    instance, result = setup()
    temperature = (result.temperature*9/5+32)
    destroy()
    return temperature


temperature = returnTemp()
print(temperature)
sys.stdout.flush()
