JFLAGS = -g
JC = javac
.SUFFIXES: .java .class
.java.class:
	$(JC) $(JFLAGS) $*.java

CLASSES = \
	AragornVsOrcs.java 

default: classes

classes: $(CLASSES:.java=.class)

run:
	java AragornVsOrcs

clean:
	$(RM) *.class

