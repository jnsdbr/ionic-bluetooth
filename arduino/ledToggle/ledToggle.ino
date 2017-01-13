#include <SoftwareSerial.h>

SoftwareSerial bt(8, 9); // RX, TX

int ledStatus = 0;

void setup() {
  bt.begin(9600);
  pinMode(13, OUTPUT);
}

void loop()
{
  if (bt.available())
  {
    ledStatus = bt.read();
    if (ledStatus == '1')
    {
      digitalWrite(13, 1);
      bt.println("on");
    }
    if (ledStatus == '0')
    {
      digitalWrite(13, 0);
      bt.println("off");
    }
  }
  delay(100);
}

