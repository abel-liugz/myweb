<template><div><p><img src="/images/io总结.png" alt="io总结.png"></p>
<ul>
<li>java io可以额让我们用标准的读写操作来完成对不同设备的读写数据工作</li>
<li>java将IO按照方向划分为输入与输出，参照点是我们写的程序</li>
<li>输入：用来读取数据的，是从外界到程序的方向，用于获取数据</li>
<li>输出：用来写出数据的，是从程序到外界的方法，用于发送数据</li>
</ul>
<h2 id="java定义了两个超类-抽象类" tabindex="-1"><a class="header-anchor" href="#java定义了两个超类-抽象类" aria-hidden="true">#</a> Java定义了两个超类（抽象类）</h2>
<ul>
<li>java.io.InputStream：所有字节输入流的超类，其中定义了读取数据的方法，因此不管读取的是什么设备都有这些读取的方法，因此可以用相同的方法读取不同设备中的数据</li>
<li>java.io.OutputStream：所有字节输出流的超类，其中定义了写出数据的方法</li>
</ul>
<h2 id="节点流与处理流" tabindex="-1"><a class="header-anchor" href="#节点流与处理流" aria-hidden="true">#</a> 节点流与处理流</h2>
<ul>
<li>节点流：也称为低级流，节点流的另一端是明确的，是实际读写数据的流，读写一定是建立在节点流基础上进行的</li>
<li>处理流：也称为高级流，处理流不能独立存在，必须连接在其他流上，目的是当数据流经当前流时，对数据进行加工处理来简化我们对数据的操作</li>
</ul>
<h2 id="文件流" tabindex="-1"><a class="header-anchor" href="#文件流" aria-hidden="true">#</a> 文件流</h2>
<p>文件流是一对低级流，用于读写文件数据的流，用于连接程序与文件（硬盘）的“管道”，负责读写文件数据</p>
<h5 id="文件输出流-java-io-fileoutputstream" tabindex="-1"><a class="header-anchor" href="#文件输出流-java-io-fileoutputstream" aria-hidden="true">#</a> 文件输出流：java.io.FileOutputStream</h5>
<h5 id="文件输入流-java-io-fileinputstream" tabindex="-1"><a class="header-anchor" href="#文件输入流-java-io-fileinputstream" aria-hidden="true">#</a> 文件输入流：java.io.FileInputStream</h5>
<h3 id="块读写的文件复制操作" tabindex="-1"><a class="header-anchor" href="#块读写的文件复制操作" aria-hidden="true">#</a> 块读写的文件复制操作</h3>
<ul>
<li>int read(byte[] data)一次性从文件中读取给定的字节数组总长度的字节量，并存入到该数组中。返回值为实际读取到的字节量。若返回值为-1则表示读取到了文件末尾。</li>
<li>块写操作 void write(byte[] data)一次性将给定的字节数组所有字节写入到文件中</li>
<li>void write(byte[] data,int offset,in len)一次性将给定的字节数组从下标offset出开始的连续len个字节写入文件</li>
</ul>
<h3 id="写文本数据" tabindex="-1"><a class="header-anchor" href="#写文本数据" aria-hidden="true">#</a> 写文本数据</h3>
<ul>
<li>
<p>String提供方法：</p>
<p>byte[] getBytes(String charsetName)将当前字符串转换为一组字节。</p>
<p>参数为字符集的名字，常用的是UTF-8，其中中文字3字节表示1个，应为1字节表示1个</p>
</li>
</ul>
<h3 id="文本输出流-追加模式" tabindex="-1"><a class="header-anchor" href="#文本输出流-追加模式" aria-hidden="true">#</a> 文本输出流-追加模式</h3>
<ul>
<li>
<p>FileOutputStream(String path,boolean append)</p>
</li>
<li>
<p>FileOutputStream(File file,boolean append)</p>
<blockquote>
<p>当第二个参数出入true时，文件流为追加模式，即：指定的文件若存在，则原有数据保留，新写入的数据会被顺序的追加到文件中</p>
</blockquote>
</li>
</ul>
<h2 id="缓冲流" tabindex="-1"><a class="header-anchor" href="#缓冲流" aria-hidden="true">#</a> 缓冲流</h2>
<ul>
<li>java.io.BufferedOutputStream</li>
<li>java.io.BufferedInputStream</li>
</ul>
<p>缓冲流是一对高级流，作用是提高读写数据效率</p>
<p>缓冲流内部有一个字节数组，默认长度是8K，缓冲流读写数据时一定试讲数据的读写方式转换为块读写来保证读写效率</p>
<h3 id="缓冲输出流写出的数据会被临时存入缓冲流内部的字节数组-知道数组存满数据才会正式写出一次" tabindex="-1"><a class="header-anchor" href="#缓冲输出流写出的数据会被临时存入缓冲流内部的字节数组-知道数组存满数据才会正式写出一次" aria-hidden="true">#</a> 缓冲输出流写出的数据会被临时存入缓冲流内部的字节数组，知道数组存满数据才会正式写出一次</h3>
<ul>
<li>
<p>flush()：缓冲流的flush方法用于强制将缓冲区中已经缓存的数据一次性写出。</p>
<blockquote>
<p>该方法实际上是在字节输出流的超类上定义的，并非只有缓冲输出流有这个方法，但是实际上只有缓冲输出流的该方法有实际意义，其他的流实现该方法的目的仅仅是为了在流连接过程中传递flush动作给缓冲输出流</p>
</blockquote>
</li>
</ul>
<h2 id="对象流" tabindex="-1"><a class="header-anchor" href="#对象流" aria-hidden="true">#</a> 对象流</h2>
<ul>
<li>java.io.ObjectOutputStream</li>
<li>java.io.ObjectInputStream</li>
</ul>
<p>对象流是一对高级流，在流连接中的作用格式进行对象的序列化和反序列化</p>
<ul>
<li>
<p>对象序列化：将一个java对象按照其结构转换为一组字节的过程</p>
</li>
<li>
<p>对象反序列化：将一组字节还原为java对象（前提是这组字节是一个对象序列化得到的字节）</p>
<blockquote>
<p>需要进行序列化的类必须实现接口：java.io.Serializable，实现序列化接口后最好主动定义序列化版本号这个常量。这样一来对象序列化时就不会根据类的结构生成一个版本号，而是使用该固定值。那么反序列化时，只要还原的对象和当前类的版本号一致就可以进行还原</p>
</blockquote>
<ul>
<li>transient关键字可以修饰熟属性，用于在进行对象序列化时忽略不必要的属性，达到瘦身的目的</li>
</ul>
</li>
</ul>
<h2 id="字符流" tabindex="-1"><a class="header-anchor" href="#字符流" aria-hidden="true">#</a> 字符流</h2>
<ul>
<li>java将流按照读写单位划分为字节流与字符流；</li>
<li>java.io.InputStream和OutputStream是所有字节流的超类</li>
<li>java.io.Reader和Writer是所有字符流的超类，他们和字节流的超类是平级关系</li>
<li>Reader和Writer是两个抽象类，里面规定了所有字符流都具备的读写字符的相关该方法</li>
<li>字符流最小读写单位为char，但是底层实际还是读写字节，只是字符与字节的转换工作有字符流完成</li>
</ul>
<h3 id="转换流" tabindex="-1"><a class="header-anchor" href="#转换流" aria-hidden="true">#</a> 转换流</h3>
<ul>
<li>
<p>java.io.InputStreamReader</p>
</li>
<li>
<p>java.io.OutputStreamWriter</p>
<blockquote>
<p>实际开发中还有功能更好用的字符高级流.但是其他的字符高级流都有一个共通点:不能直接连接在字节流上.而实际操作设备的流都是低级流同时也都是字节流.因此不能直接在流连接中串联起来.转换流是一对可以连接在字节流上的字符流,其他的高级字符流可以连接在转换流上.在流连接中起到&quot;转换器&quot;的作用(负责字符与字节的实际转换)</p>
</blockquote>
</li>
</ul>
<h3 id="缓冲字符流" tabindex="-1"><a class="header-anchor" href="#缓冲字符流" aria-hidden="true">#</a> 缓冲字符流</h3>
<ul>
<li>
<p>java.io.BufferedWriter</p>
</li>
<li>
<p>java.io.BufferedReader</p>
<blockquote>
<p>缓冲字符流内部也有一个缓冲区,读写文本数据以块读写形式加快效率.并且缓冲流有一个特别的功能:可以按行读写文本数据.
java.io.PrintWriter具有自动行刷新的缓冲字符输出流,实际开发中更常用.它内部总是会自动连接BufferedWriter作为块写加速使用.</p>
</blockquote>
</li>
</ul>
<h4 id="printwriter自动行刷新功能" tabindex="-1"><a class="header-anchor" href="#printwriter自动行刷新功能" aria-hidden="true">#</a> PrintWriter自动行刷新功能</h4>
<blockquote>
<p>如果实例化PW时第一个参数传入的是一个流，则测试可以在闯入一个boolean型的参数，此值为true时就打开了自动行刷新功能</p>
</blockquote>
</div></template>
