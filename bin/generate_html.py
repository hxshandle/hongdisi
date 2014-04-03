#! /usr/bin/python
import os

tplDir = os.path.join(os.path.abspath(os.path.join(os.path.dirname('__file__'),os.path.pardir)),'jade')
outputDir = os.path.abspath(os.path.join(tplDir,os.path.pardir))
#print 'template dir is:', tplDir

for file in os.listdir(tplDir):
  f = os.path.join(tplDir,file)
  if file[0:1] == "_":
    continue
  cmd = "jade {0} -P -p {1} -o {2}".format(f,tplDir,outputDir)
  #print 'Processing template:', f
  os.system(cmd)

