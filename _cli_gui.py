import os
from tkinter import Tk
from tkinter import Button 

cmds = [
    "npm run start:dev",
    "npm run format",
    "uiportainer",
    "uipgadmin"
]
def runCmd(cmd_base:str):
    cmd = "gnome-terminal -e 'bash -c \""+cmd_base+" ;bash\"'"
    os.system(cmd)
    return None
     
 
fenetre = Tk()
fenetre.geometry('200x200')

btn1 = Button(fenetre,text="start dev server")
btn1.pack()
btn1.config(command= lambda:runCmd(cmds[0]))

btn2 = Button(fenetre,text='npm run format')
btn2.pack()
btn2.config(command= lambda : runCmd(cmds[1]) )

btn2 = Button(fenetre,text='ui portainer')
btn2.pack()
btn2.config(command= lambda : runCmd(cmds[2]) )

btn2 = Button(fenetre,text='ui pg admin')
btn2.pack()
btn2.config(command= lambda : runCmd(cmds[3]) )


  
fenetre.mainloop()
# python _cli_gui.py