---
title: "项目中的隐藏文件夹.husky"
date: "2023-12-05"
categories: 
  - "前端"
---

上文提到过使用husky + commitlint来规范代码提交，让我们看看腾讯的husky规范如何写的

![](images/image.png)

`npx husky install` 是一个用于配置和初始化 [Husky](https://typicode.github.io/husky/#/) 的命令。Husky 是一个流行的工具，用于在 Git 钩子（hooks）中自动化代码质量检查，比如在提交（commit）前运行 linters 和测试。

当你运行 `npx husky install` 时，它执行以下操作：

1. **安装 Husky：** 如果你的项目中还没有安装 Husky，这个命令会安装它。

3. **创建 `.husky` 文件夹：** 这个文件夹用于存储 Git 钩子的脚本。例如，你可能有一个名为 `pre-commit` 的脚本，它在每次提交之前运行以确保代码符合项目标准。

5. **配置 Git 钩子：** Husky 会配置 Git 钩子，以便在特定的 Git 操作（如提交或推送）时自动运行这些脚本。

总的来说，`npx husky install` 帮助你设置一个框架，让你能够在 Git 操作期间轻松地自动运行脚本，以提高代码质量和一致性。这对于团队项目特别有用，因为它帮助确保所有贡献者遵守相同的代码标准。所以文件夹“\_”不用理会。

接下来就是最重要的三个文件，commit-msg，pre-commit，prepare-commit-msg。

* * *

commit-msg的文件内容为

```
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

if [[ "$OS" == "Windows_NT" ]]; then
  npx.cmd --no-install commitlint -e $GIT_PARAMS
else
  npx --no-install commitlint -e $GIT_PARAMS
fi
```

  
好的，您提供的脚本内容是一个Git中的`commit-msg`钩子，使用了Husky。这个脚本的目的是用`commitlint`来强制执行提交信息的规范。这里解释一下脚本的每个部分：

1. `#!/bin/sh`：这是一个shebang行，它告诉系统使用shell解释器来执行这个脚本。

3. `. "$(dirname "$0")/_/husky.sh"`：这行代码从当前脚本位置的相对目录中导入`husky.sh`脚本。Husky使用这个来设置它的环境，并且应该被包含在所有Husky钩子中。

5. `if`语句检查操作系统：
    - `if [[ "$OS" == "Windows_NT" ]]; then`：这检查脚本是否在Windows上运行。
        - `npx.cmd --no-install commitlint -e $GIT_PARAMS`：在Windows上，它使用`npx.cmd`来运行`commitlint`，并且使用`--no-install`选项来避免安装它。它通过`-e $GIT_PARAMS`将Git参数传递给`commitlint`。这是必要的，因为Windows处理命令行脚本的方式不同，经常需要对Node.js工具使用`.cmd`扩展名。
    
    - `else`：如果操作系统不是Windows，则假设是其他类型的系统（如Linux或macOS）。
        - `npx --no-install commitlint -e $GIT_PARAMS`：在非Windows系统上，它使用`npx`来运行`commitlint`，同样使用`--no-install`选项，并传递Git参数。这里不需要`.cmd`扩展名。

* * *

pre-commit的文件内容为

```
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

if [[ "$OS" == "Windows_NT" ]]; then
  npx.cmd lint-staged
else
  npx lint-staged
fi
```

这个 `pre-commit` 文件是一个 Git 钩子脚本，用于在每次提交之前自动执行某些任务。这个特定的脚本使用了 Husky，

这是一个工具，用于在 Git 操作（如提交、推送等）中方便地运行脚本。让我们来分解这个脚本的内容：

1. **Shebang（`#!/bin/sh`）：** 这行告诉操作系统使用 `/bin/sh`（shell）来执行这个脚本。

3. **加载 Husky 脚本（`. "$(dirname "$0")/_/husky.sh"`）：** 这行代码加载 Husky 的助手脚本。`$(dirname "$0")` 是一个命令，用于获取当前脚本所在的目录。因此，`"$(dirname "$0")/_/husky.sh"` 是指当前目录下的 `_/husky.sh` 文件。

5. **条件执行（`if [[ "$OS" == "Windows_NT" ]]; then ... else ... fi`）：** 这是一个条件语句，根据操作系统的类型来执行不同的命令。这里检查的是是否在 Windows 系统上运行（`Windows_NT` 是 Windows 系统中的一个环境变量）。
    - 在 Windows 上，它运行 `npx.cmd lint-staged`。`npx.cmd` 是在 Windows 上运行 npx 命令的方式。
    
    - 在非 Windows 系统（如 Linux 或 macOS）上，它运行 `npx lint-staged`。

7. **lint-staged：** `lint-staged` 是一个工具，用于在 Git 暂存文件上运行 linters 和其他代码质量检查工具。这意味着每次你执行提交操作时，`lint-staged` 会自动运行并检查你的代码，确保它符合预设的标准。

总之，这个 `pre-commit` 脚本的目的是在提交代码之前自动执行代码质量检查，确保提交的代码符合项目规范。这对于维护代码库的整洁和一致性非常有帮助。

* * *

prepare-commit-msg的内容为

```
#!/bin/sh
[[ "$(uname -a)" = *"MINGW64"* ]] && exit 0
[ -n "$CI" ] && exit 0
. "$(dirname "$0")/_/husky.sh"

if [[ "$OS" == "Windows_NT" ]]; then
  exec < /dev/tty && npx.cmd git-cz --hook || true
else
  exec < /dev/tty && npx git-cz --hook || true
fi
```

  
这个 `prepare-commit-msg` 脚本是另一个 Git 钩子，它在提交消息被创建但在用户编辑它之前运行。这个脚本同样利用 Husky 来集成其功能。以下是脚本内容的解析：

1. **Shebang（`#!/bin/sh`）：** 这指定了脚本应该使用 `/bin/sh`（shell）执行。

3. **环境检查：**
    - `[[ "$(uname -a)" = *"MINGW64"* ]] && exit 0`：这一行检查是否在 MINGW64 环境下运行（一种在 Windows 上提供 Unix 环境的工具）。如果是，脚本会立即退出，不执行后续操作。
    
    - `[ -n "$CI" ] && exit 0`：这检查是否有 `CI`（持续集成）环境变量设置。如果设置了，脚本同样会立即退出。这通常用于避免在自动化的 CI 过程中运行此脚本。

5. **加载 Husky 脚本（`. "$(dirname "$0")/_/husky.sh"`）：** 这一行加载 Husky 的助手脚本，位于当前脚本所在目录下的 `_/husky.sh`。

7. **条件执行：**
    
    - 在 Windows 系统上，它执行 `exec < /dev/tty && npx.cmd git-cz --hook || true`。
    - 在非 Windows 系统上，它执行 `exec < /dev/tty && npx git-cz --hook || true`。
    
    这些命令的作用是启动 `git-cz` 工具。`git-cz` 是一个常用于生成符合[约定式提交](https://www.conventionalcommits.org/)标准的提交信息的工具。`exec < /dev/tty` 确保用户可以交互式地输入提交信息，而 `--hook` 参数表示这个命令是从 Git 钩子调用的。最后的 `|| true` 确保即使 `git-cz` 命令失败，脚本也不会返回错误状态。

9. **操作系统特定命令：**
    - 在 Windows 上，它使用 `npx.cmd` 而不是 `npx`。这是因为在 Windows 的某些环境下，需要特别指定 `.cmd` 扩展名来正确运行命令。

总结来说，这个 `prepare-commit-msg` 脚本用于在用户提交代码之前，自动启动 `git-cz` 工具来帮助用户生成标准化的提交信息。这有助于保持项目提交记录的整洁和一致性。
