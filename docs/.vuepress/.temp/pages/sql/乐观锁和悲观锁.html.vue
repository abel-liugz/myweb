<template><div><h2 id="锁" tabindex="-1"><a class="header-anchor" href="#锁" aria-hidden="true">#</a> 锁</h2>
<ul>
<li>锁的分类
<ul>
<li>按照锁的粒度分：表锁、行锁</li>
<li>按类型分：
<ul>
<li>共享锁：也叫做 share 锁、s 锁
<ul>
<li>特点：可以给表加锁，也可以给行数据加锁。给目标数据加上 share 锁之后允许其他事务继续对该数据加 share 锁，不允许其他事务对该数据加排它锁；通常读取数据时使用</li>
</ul>
</li>
<li>排它锁、独占锁：也叫 x 锁
<ul>
<li>特点：给数据加排它锁，不允许其他事务给该数据加排它锁，同时不允许其他事务给该数据加共享锁</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
<p>在数据库中，经常执行读写操作为：</p>
<ul>
<li>select…</li>
<li>insert…</li>
<li>delete…</li>
<li>update…</li>
</ul>
<p>增删改操作默认开启事务，会给操作的行数据加排它锁，select 操作默认不加任何锁</p>
<p>如何在查询是加共享锁、排它锁</p>
<ul>
<li>共享锁：
<ul>
<li>select......lock in share mode;</li>
<li>select......for share;</li>
</ul>
</li>
<li>排它锁：
<ul>
<li>select......for update;</li>
</ul>
</li>
</ul>
<hr>
<h6 id="mysql-的存储引擎" tabindex="-1"><a class="header-anchor" href="#mysql-的存储引擎" aria-hidden="true">#</a> mysql 的存储引擎：</h6>
<p>mysql5.5 开始存储引擎变成 InnoDB，特点：支持行锁</p>
<hr>
<h1 id="悲观锁和乐观锁" tabindex="-1"><a class="header-anchor" href="#悲观锁和乐观锁" aria-hidden="true">#</a> 悲观锁和乐观锁</h1>
<blockquote>
<p>是两种思想
{.is-info}</p>
</blockquote>
<h2 id="悲观锁" tabindex="-1"><a class="header-anchor" href="#悲观锁" aria-hidden="true">#</a> 悲观锁：</h2>
<blockquote>
<p>当多事务、多线程并发执行时，事务总是悲观的认为，在自己访问数据期间，其他事务一定会并发执行，此时会产生线程安全问题，所以为了保证线程安全，这个事务在访问数据时，立即给数据加锁，从而保证线程安全。
synchronized、排它锁都是悲观锁的应用
{.is-info}</p>
</blockquote>
<ul>
<li>特点：可以保证线程安全，但是并发执行效率低下</li>
</ul>
<h2 id="乐观锁" tabindex="-1"><a class="header-anchor" href="#乐观锁" aria-hidden="true">#</a> 乐观锁</h2>
<blockquote>
<p>在多线程、多事务并发执行中，某个事务总是乐观的认为，在自己执行期间，没有其他事务与之并发，认为不会产生线程安全问题，所以不会给数据加锁；但是确实存在其他事务与之并发执行的情况，确实存在线程安全问题，为了保证线程安全，通过版本号机制或 CAS 来保证线程安全。
{.is-info}</p>
</blockquote>
<ul>
<li>版本号机制
<img src="/版本号机制.png" alt="版本号机制.png"></li>
<li>CAS：compare and swap 比较并交换</li>
</ul>
</div></template>
