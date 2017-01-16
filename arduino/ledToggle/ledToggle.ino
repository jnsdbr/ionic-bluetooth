#include <SoftwareSerial.h>

SoftwareSerial bt(8, 9); // RX, TX

int command = 0;
boolean logTime = false;

void setup() {
  bt.begin(9600);
  pinMode(13, OUTPUT);
}

void loop()
{
  if (bt.available())
  {
    command = bt.read();
    if (command == '1')
    {
      digitalWrite(13, 1);
      bt.println("on");
    }
    if (command == '0')
    {
      digitalWrite(13, 0);
      bt.println("off");
    }
    if (command == '3')
    {
      logTime = true;
    }
    if (command == '2')
    {
      logTime = false;
    }
  }
  if (logTime)
  {
    bt.println(millis());
  }
  delay(100);
}

