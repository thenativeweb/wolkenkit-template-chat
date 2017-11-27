# wolkenkit-template-chat

wolkenkit-template-chat is an application template for wolkenkit.

## Installation

This is an application template for [wolkenkit](https://www.wolkenkit.io), a CQRS- and event-sourcing framework for JavaScript and Node.js. If you have not yet installed its CLI, please see the [thenativeweb/wolkenkit](https://github.com/thenativeweb/wolkenkit) repository.

To install this template use the wolkenkit CLI:

```shell
$ wolkenkit init --template https://github.com/thenativeweb/wolkenkit-template-chat.git
```

## Quick start

Since this template contains a complete application, you can run it without further ado. To start the server, run the following command:

```shell
$ wolkenkit start
```

To start the client, first you need to install `http-server` globally:

```shell
$ npm install -g http-server
```

Then to actually run the client use the following command:

```shell
$ http-server ./client/ -o
```

## License

Copyright (c) 2015-2017 the native web.

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not, see [GNU Licenses](http://www.gnu.org/licenses/).
