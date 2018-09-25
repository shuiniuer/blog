## 查看log

```
查看操作记录：
git log

查看所有分支的所有操作记录：
git reflog // 包括已经删除的commit，它也可以用来恢复不小心删除的分支或提交
```

## 添加修改到暂存区

```
git add -A
git add -i
```

## 提交 

```
git ci -m '<message>' //message为提交说明
```

## 从远程分支拉取代码

```
git pull origin <branch name>
```

## 推送到远程分支

```
git push origin <branch name>
```

## 撤销提交

```
回退到上一个版本：
git reset --hard HEAD^

回退到某一个版本：
git reset --hard <commit版本号>

git reset –soft <commit版本号>

git push origin master --force
```

## 使用revert撤销提交

```
撤销前一次
git revert HEAD 

撤销前前一次
git revert HEAD^

撤销到指定版本
git revert commit版本号
```

## 撤销修改

```
修改的文件未加入到暂存区，撤销修改：
git checkout -- <file>

修改的文件已加入到暂存区，撤销修改：
git reset HEAD <file>
git checkout -- <file>
```

## 从一个分支cherry-pick多个commit

```
简单操作：
git cherry-pick <commit-id>

保留原提交的作者信息操作：
git cherry-pick -x <commit_id>

一个开始和结束的commit进行操作：
git cherry_pick <start-commit-id>…<end-commit-id> //不包含<start-commit-id>
git cherry-pick <start-commit-id>^...<end-commit-id> //包含<start-commit-id>

```



## 分支

```
查看分支：
git branch

创建分支：
git branch <branch name>

切换分支：
git checkout <branch name>

创建+切换分支：
git checkout -b <branch name>

合并某分支到当前分支：
git merge <branch name>

删除分支：
git branch -d <branch name>

删除远程分支
git push origin --delete <BranchName>
```

## rebase

```
git rebase -i <BranchName>

	pick：保留该commit（缩写:p）

	reword：保留该commit，但我需要修改该commit的注释（缩写:r）

	edit：保留该commit, 但我要停下来修改该提交(不仅仅修改注释)（缩写:e）

	squash：将该commit和前一个commit合并（缩写:s）

	fixup：将该commit和前一个commit合并，但我不要保留该提交的注释信息（缩写:f）

	exec：执行shell命令（缩写:x）

	drop：我要丢弃该commit（缩写:d）
```

[rebase 原理](http://gitbook.liuhui998.com/4_2.html)

## 标签

```
查看所有标签：
git tag

创建标签：
git tag <tagname>

git tag <tagname> <commit id>

创建指定信息的标签：
git tag -a <tagname> -m "blablabla..."

推送某个标签到远程：
git push origin <tagname>

一次性推送全部尚未推送到远程的本地标签：
git push origin --tags

删除标签：
git tag -d <tagname>

删除远程标签：
git tag -d <tagname>
git push origin :refs/tags/<tagname>
```

## 切换远程仓库

```
方式一：
git remote set-url origin URL //URL为新地址。

方式二：
git remote rm origin //删除现有远程仓库 
git remote add origin URL //添加新远程仓库
```

## 配置

```
别名配置：

git config --global alias.st status

git config --global alias.co checkout

git config --global alias.ci commit

git config --global alias.br branch

git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"

显示最后一次提交信息：
git config --global alias.last 'log -1'

仓库的Git配置文件放在`.git/config`文件中：
cat .git/config

```

当前用户的Git配置文件放在用户主目录下的一个隐藏文件.gitconfig中：
cat .gitconfig

## 账户

```
查看当前git用户名：
git config user.name

查看当前git邮箱：
git config user.email

切换git用户名: 

git config --global user.name "YOURUSERNAME"

切换git邮箱：git config --global user.email "YOUREMAIL"

```

## 参考资料

- [Git community book 中文版](http://gitbook.liuhui998.com/index.html)