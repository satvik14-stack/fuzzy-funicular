import matplotlib.pyplot as plt
Days=[1,2,3,4,5,6,7]
Sleeping  = [7,8,8,8,8,8,7]
Playing   = [2,2,3,2,1,5,7]
Working   = [8,6,6,8,8,3,3]
Dancing   = [2,2,2,2,1,3,2]
Essential = [2,3,3,2,3,3,2]
Eating    = [3,3,2,2,3,2,3]


plt.plot([],[],color='m',label='Sleeping',linewidth=3)
plt.plot([],[],color='k',label='Playing',linewidth=3)
plt.plot([],[],color='r',label='Working',linewidth=3)
plt.plot([],[],color='b',label='Dancing',linewidth=3)
plt.plot([],[],color='c',label='Eating',linewidth=3)
plt.plot([],[],color='g',label='Essential',linewidth=3)

plt.stackplot(Days,Sleeping,Playing,Working,Dancing,Eating,Essential, colors=['m','k','r','b','c','g'])

plt.xlabel('x')
plt.ylabel('y')
plt.title('Hours Spent In A Week')
plt.legend()
plt.show()


