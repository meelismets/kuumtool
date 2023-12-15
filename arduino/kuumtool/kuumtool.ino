#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BNO055.h>
#include <utility/imumaths.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
 

/* Set the delay between fresh samples */
uint16_t BNO055_SAMPLERATE_DELAY_MS = 100;
 
// Check I2C device address and correct line below (by default address is 0x29 or 0x28)
//                                   id, address
Adafruit_BNO055 bno = Adafruit_BNO055(55, 0x28);
const char *ssid = "kuumtool";
const char *password = "kuumtool";
const char *apiEndpoint = "http://10.42.0.1/api/spots/1";  // Replace with your API endpoint
 
void setup(void) {
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }

  Serial.println("Connected to WiFi");
  Serial.println("Orientation Sensor Test"); Serial.println("");
 
  /* Initialise the sensor */
  if (!bno.begin()) {
    /* There was a problem detecting the BNO055 ... check your connections */
    Serial.print("Ooops, no BNO055 detected ... Check your wiring or I2C ADDR!");
    while (1);
  }

  pinMode(A0, INPUT);
  delay(3000);
}

unsigned long dataCollectionTime = 0;
unsigned long apiSendTime = 0;
const int dataCollectionInterval = 100;
const int apiSendInterval = 3000;
const int bufferSize = 100;
int noiseCircularBuffer[bufferSize];
int noiseCurrentIndex = 0;
int movementCircularBuffer[bufferSize];
int movementCurrentIndex = 0;
int lastX = 0;
int lastY = 0;
int newX = 0;
int newY = 0;

void loop(void) {

  // Data collection
  if (millis() - dataCollectionTime >= dataCollectionInterval) {
    int noise=static_cast<int>(abs(analogRead(A0)-541))*10;
    addToNoiseBuffer(noise);

    sensors_event_t orientationData , angVelocityData , linearAccelData, magnetometerData, accelerometerData, gravityData;
    bno.getEvent(&orientationData, Adafruit_BNO055::VECTOR_EULER);
    printEvent(&orientationData);

    dataCollectionTime = millis();
  }

  // API send task
  if (millis() - apiSendTime >= apiSendInterval) {
    if (WiFi.status() == WL_CONNECTED) {
      int averageNoise = calculateNoiseAverage();
      //Serial.println("Calculated noise average: ");
      //Serial.println(averageNoise);
      String noiseUrl = String("http://10.42.0.1/api/spots/1/volume/")+String(averageNoise);
      sendToApi(noiseUrl);

      int averageMovement = calculateMovementAverage();
      //Serial.println("Calculated movement average: ");
      //Serial.println(averageMovement);
      String movementUrl = String("http://10.42.0.1/api/spots/1/movement/")+String(averageMovement);
      sendToApi(movementUrl);

      Serial.println("Sending data to API...");

      // Update the last API send time
      apiSendTime = millis();
    }
  }
}

void sendToApi(String url) {
  HTTPClient http;
      
      // Make the GET request
      WiFiClient client;
      http.begin(client,url);
      int httpCode = http.GET();

      if (httpCode > 0) {
        String payload = http.getString();
        Serial.println("Response: " + payload);
      } else {
        Serial.println("Error on HTTP request");
      }
      http.end();
}
 
void printEvent(sensors_event_t* event) {
  double x = -1000000, y = -1000000 , z = -1000000; //dumb values, easy to spot problem
  if (event->type == SENSOR_TYPE_ACCELEROMETER) {
    //Serial.print("Accl:");
    x = event->acceleration.x;
    y = event->acceleration.y;
    z = event->acceleration.z;
  }
  else if (event->type == SENSOR_TYPE_ORIENTATION) {
    //Serial.print("kalle:");
    x = event->orientation.x;
    y = event->orientation.y;
    z = event->orientation.z;
  }
  else if (event->type == SENSOR_TYPE_MAGNETIC_FIELD) {
    //Serial.print("Mag:");
    x = event->magnetic.x;
    y = event->magnetic.y;
    z = event->magnetic.z;
  }
  else if (event->type == SENSOR_TYPE_GYROSCOPE) {
    //Serial.print("Gyro:");
    x = event->gyro.x;
    y = event->gyro.y;
    z = event->gyro.z;
  }
  else if (event->type == SENSOR_TYPE_ROTATION_VECTOR) {
    Serial.print("Rot:");
    x = event->gyro.x;
    y = event->gyro.y;
    z = event->gyro.z;
  }
  else if (event->type == SENSOR_TYPE_LINEAR_ACCELERATION) {
    //Serial.print("Linear:");
    x = event->acceleration.x;
    y = event->acceleration.y;
    z = event->acceleration.z;
  }
  else {
    //Serial.print("Unk:");
  }
  newX = static_cast<int>(x);
  newY = static_cast<int>(y);
  if (lastX != newX ) {
    //Serial.print("Movement detected on X");
    addToMovementBuffer(100);
    lastX = newX;
  } else if (lastY != newY) {
    //Serial.print("Movement detected on Y");
    addToMovementBuffer(100);
    lastY = newY;
  } else {
    addToMovementBuffer(0);
  }

  /*Serial.print("\tx= ");
  Serial.print(x);
  Serial.print(" |\ty= ");
  Serial.print(y);
  Serial.print(" |\tz= ");
  Serial.println(z);*/
}

void addToNoiseBuffer(int value) {
  noiseCircularBuffer[noiseCurrentIndex] = value;
  noiseCurrentIndex = (noiseCurrentIndex + 1) % bufferSize;
}

void addToMovementBuffer(int value) {
  movementCircularBuffer[movementCurrentIndex] = value;
  movementCurrentIndex = (movementCurrentIndex + 1) % bufferSize;
}

int calculateNoiseAverage() {
  float sum = 0;
  for (int i = 0; i < bufferSize; i++) {
    sum += noiseCircularBuffer[i];
  }
  return static_cast<int>(sum / bufferSize);
}

int calculateMovementAverage() {
  float sum = 0;
  for (int i = 0; i < bufferSize; i++) {
    sum += movementCircularBuffer[i];
  }
  return static_cast<int>(sum / bufferSize);
}