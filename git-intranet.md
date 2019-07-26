# 在公共服务器下创建一个空仓库

1. 服务端

- 创建一个文件夹，如 map
- 进入该文件夹，建立裸仓库

  `git --bare init`

2. 设置网络访问权限

- 设置 public.git 为共享文件夹
- 确认在本机文件管理器中通过“ \\IP 地址\共享文件夹名称 ”的形式可以访问到（\\PC-201904032050\map）

3. 在本机设置远程库

- git remote add [name] //IP 地址/共享文件夹名称，[name] 可以任意起名 如 origin
- 利用 git remote 查看一下设置远程库是否成功，一般不会有什么问题
- 进入本地库，将本地代码 push 到远程公共库

  `git config receive.denyCurrentBranch ignore`
  `git push --set-upstream [name] master`
