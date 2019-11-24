#include<iostream>
#include<algorithm>
using namespace std;
void displayArray(int a[],int n)
{   cout<<endl<<"你输入的数组是：";
 for(int i=0;i<n;i++)cout<<a[i]<<"   ";
 cout<<endl;}
int main()
{   int n,j; cout<<"输入的数值的个数:"; cin>>n; int *p; p=new int[n];
for(int i=0;i<n;i++)
 {   cout<<"输入第"<<i+1<<"个数值："<<endl;
  cin>>j;
  p[i]=j;}
 displayArray(p,n);
 int l=1;
 while(l) {   
   int k;
  int *q;
  cout<<endl<<"要查找的数值：";
  cin>>k;
  q=find(p,p+n-1,k);   
   cout<<"查找的数值"<<k<<"的位置在第"<<q-p+1<<"位！"<<endl<<endl; 
    } 
    return 0;
}