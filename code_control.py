from event_manager import *
from machine import Pin, SoftI2C
from aiot_dht20 import DHT20
from yolobit import *
button_a.on_pressed = None
button_b.on_pressed = None
button_a.on_pressed_ab = button_b.on_pressed_ab = -1
from aiot_lcd1602 import LCD1602
from mqtt import *
from machine import RTC
import ntptime
import time
from aiot_rgbled import RGBLed

event_manager.reset()

aiot_dht20 = DHT20()

aiot_lcd1602 = LCD1602()

def on_event_timer_callback_h_j_w_b_T():
  global th_C3_B4ng_tin, RT, RH, SM, LUX
  aiot_dht20.read_dht20()
  RT = aiot_dht20.dht20_temperature()
  RH = aiot_dht20.dht20_humidity()
  SM = round(translate((pin1.read_analog()), 0, 4095, 0, 100))
  LUX = round(translate((pin2.read_analog()), 0, 4095, 0, 100))
  aiot_lcd1602.move_to(0, 0)
  aiot_lcd1602.putstr('RT:')
  aiot_lcd1602.move_to(3, 0)
  aiot_lcd1602.putstr(RT)
  aiot_lcd1602.move_to(7, 0)
  aiot_lcd1602.putstr('*C')
  aiot_lcd1602.move_to(10, 0)
  aiot_lcd1602.putstr('RH:')
  aiot_lcd1602.move_to(13, 0)
  aiot_lcd1602.putstr(RH)
  aiot_lcd1602.move_to(15, 0)
  aiot_lcd1602.putstr('%')
  aiot_lcd1602.move_to(0, 1)
  aiot_lcd1602.putstr('LUX:')
  aiot_lcd1602.move_to(4, 1)
  aiot_lcd1602.putstr(LUX)
  aiot_lcd1602.move_to(6, 1)
  aiot_lcd1602.putstr('% ')
  aiot_lcd1602.move_to(9, 1)
  aiot_lcd1602.putstr('SM:')
  aiot_lcd1602.move_to(13, 1)
  aiot_lcd1602.putstr(SM)
  aiot_lcd1602.move_to(15, 1)
  aiot_lcd1602.putstr('%')
  mqtt.publish('bbc-temp', RT)
  mqtt.publish('bbc-humid-air', RH)
  mqtt.publish('bbc-humid-soil', SM)
  mqtt.publish('bbc-light', LUX)
  
  if LUX < 70:
    tiny_rgb.show(0, hex_to_rgb('#00ff00'))
  else:
    tiny_rgb.show(0, hex_to_rgb('#0000ff'))

event_manager.add_timer_event(60000, on_event_timer_callback_h_j_w_b_T)

def on_mqtt_message_receive_callback__bbc_pump_(th_C3_B4ng_tin):
  global RT, RH, SM, LUX
  if th_C3_B4ng_tin == '1':
    pin10.write_analog(round(translate(70, 0, 100, 0, 1023)))
  else:
    pin10.write_analog(round(translate(0, 0, 100, 0, 1023)))

# Mô tả hàm này...
def t_C6_B0_E1_BB_9Bi_c_C3_A2y_th_E1_BB_A7_c_C3_B4ng():
  global th_C3_B4ng_tin, RT, RH, SM, LUX, aiot_dht20, tiny_rgb, aiot_lcd1602
  mqtt.on_receive_message('bbc-pump', on_mqtt_message_receive_callback__bbc_pump_)

tiny_rgb = RGBLed(pin0.pin, 4)

def on_mqtt_message_receive_callback__bbc_led_(th_C3_B4ng_tin):
  global RT, RH, SM, LUX
  if th_C3_B4ng_tin == '1':
    tiny_rgb.show(0, hex_to_rgb('#00ff00'))
  else:
    tiny_rgb.show(0, hex_to_rgb('#0000ff'))

# Mô tả hàm này...
def b_E1_BA_ADt__C4_91_C3_A8n_th_E1_BB_A7_c_C3_B4ng():
  global th_C3_B4ng_tin, RT, RH, SM, LUX, aiot_dht20, tiny_rgb, aiot_lcd1602
  mqtt.on_receive_message('bbc-led', on_mqtt_message_receive_callback__bbc_led_)

if True:
  display.scroll('WAIT')
  mqtt.connect_wifi('SauNguyen', '0983121937')
  mqtt.connect_broker(server='io.adafruit.com', port=1883, username='nhatnam1308', password='aio_LBCe46cnlptFD9s0bKbxdQFM1DwX')
  ntptime.settime()
  (year, month, mday, week_of_year, hour, minute, second, milisecond) = RTC().datetime()
  RTC().init((year, month, mday, week_of_year, hour+7, minute, second, milisecond))
  aiot_lcd1602.clear()
  b_E1_BA_ADt__C4_91_C3_A8n_th_E1_BB_A7_c_C3_B4ng()
  t_C6_B0_E1_BB_9Bi_c_C3_A2y_th_E1_BB_A7_c_C3_B4ng()
  display.scroll('OK')

while True:
  event_manager.run()
  mqtt.check_message()
  time.sleep_ms(1000)
  time.sleep_ms(10)
