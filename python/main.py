import zmq

context2 = zmq.Context()
outsocket = context2.socket(zmq.PUB)
outsocket.bind("tcp://10.240.177.106:9999")
x = True
while x:
    print ('before start')
    print (' '.join(['dot_one']))
    name = input("Enter your option: ")
    if (name=='1'):
        outsocket.send_string('dot_one')

    if (name=='2'):
        outsocket.send_string( ' '.join(['not_two']))
    if (name=='3'):
        outsocket.send_string( ' '.join(['not_three']))
    if (name=='4'):
        outsocket.send_string( ' '.join(['dot_four']))