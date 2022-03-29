f=open(r"C:\Users\plath\Documents\programming codes\SwiftCv\create\file1.txt","r+")
for line in f:
    words=line.split()
    print(words[0])