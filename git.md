## 查看log
`git log`

## 撤销提交
- 回退到上一个版本：
`git reset --hard HEAD^`

- 回退到某一个版本：
`git reset --hard <版本号>`

## 撤销修改
- 修改的文件未加入到暂存区，撤销修改：
`git checkout -- <file>`

- 修改的文件已加入到暂存区，撤销修改：

`git reset HEAD <file>`

`git checkout -- <file>`

## 分支
- 查看分支：
`git branch`

- 创建分支：
`git branch <branch name>`

- 切换分支：
`git checkout <branch name>`

- 创建+切换分支：
`git checkout -b <branch name>`

- 合并某分支到当前分支：
`git merge <branch name>`

- 删除分支：
`git branch -d <branch name>`

- 删除远程分支
`git push origin --delete <BranchName>`

## rebase
git rebase -i origin/master

## 标签
- 查看所有标签：
`git tag`

- 创建标签：

`git tag <tagname>`

`git tag <tagname> <commit id>`

- 创建指定信息的标签：
`git tag -a <tagname> -m "blablabla..."`

- 推送某个标签到远程：
`git push origin <tagname>`

- 一次性推送全部尚未推送到远程的本地标签：
`git push origin --tags`

- 删除标签：
`git tag -d <tagname>`

- 删除远程标签：
`git tag -d <tagname>`
`git push origin :refs/tags/<tagname>`

## 切换远程仓库
方式一：

`git remote set-url origin URL` URL为新地址。

方式二：

`git remote rm origin` 删除现有远程仓库 

`git remote add origin URL` 添加新远程仓库

## 配置
别名配置：

- `git config --global alias.st status`

- `git config --global alias.co checkout`

- `git config --global alias.ci commit`

- `git config --global alias.br branch`

- `git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"`

- 显示最后一次提交信息：
`git config --global alias.last 'log -1'`

仓库的Git配置文件放在`.git/config`文件中：
`cat .git/config`

当前用户的Git配置文件放在用户主目录下的一个隐藏文件`.gitconfig`中：
`cat .gitconfig`


test1