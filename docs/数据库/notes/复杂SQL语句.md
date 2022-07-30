---
title: 复杂SQL语句
sidebar: false
---


1、查询"语文"课程比"数学"课程成绩高的学生的性别及课程分数

~~~sql
三表联查：
select s.*, sc1.s_score '语文分数', sc2.s_score '数学分数'
from score sc1
         join score sc2
         join student s on sc1.s_id = sc2.s_id and sc1.s_id = s.s_id
where sc1.c_id = (select c_id from course where c_name = '语文')
  and sc2.c_id = (select c_id from course where c_name = '数学')
  and sc1.s_score > sc2.s_score
~~~

2、查询"语文"课程比"数学"课程成绩低的学生的性别及课程分数

~~~sql
select s.*, sc1.s_score '语文分数', sc2.s_score '数学分数'
from score sc1
         join score sc2
         join student s on sc1.s_id = sc2.s_id and sc1.s_id = s.s_id
where sc1.c_id = (select c_id from course where c_name = '语文')
  and sc2.c_id = (select c_id from course where c_name = '数学')
  and sc1.s_score < sc2.s_score
~~~

3、查询平均成绩大于等于60分的同学的学生编号和学生姓名和平均成绩

4、查询平均成绩小于60分的同学的学生编号和学生姓名和平均成绩(包括有成绩的和无成绩的)

~~~sql
求平均分不能使用avg，应该使用总分/总课程数
select s.s_id, s_name, ifnull(sum(s_score), 0) / (select count(*) from course) av
from student s
         left join score sc on s.s_id = sc.s_id
group by s.s_id
having av < 60

~~~

5、查询所有同学的学生编号、学生姓名、选课总数、所有课程的总成绩

~~~sql
select s.s_id, s_name, count(c_id) '选课总数', sum(s_score) '总成绩'
from student s
         left join score sc on s.s_id = sc.s_id
group by s.s_id
~~~

6、查询"王"姓老师的数量

~~~sql
select count(*) from teacher where t_name like '王%'
~~~

7、查询学过"张三"老师授课的同学的信息

~~~sql
select s.*
from teacher t
         join course c
         join score sc
         join student s on t.t_id = c.t_id and c.c_id = sc.c_id and sc.s_id = s.s_id
where t_name = '张三'
~~~

8、查询学过编号为"01"并且也学过编号为"02"的课程的同学的信息

~~~sql
select s.*, sc1.s_score '01', sc2.s_score '02'
from student s
         join score sc1
         join score sc2 on sc1.s_id = sc2.s_id and sc1.s_id = s.s_id
where sc1.c_id = '01'
  and sc2.c_id = '02'
~~~

9、按平均成绩从高到低显示所有学生的所有课程的成绩以及平均成绩

~~~sql
s_id,  语文   数学    英语   平均成绩

select s.s_id,
       s_name,
       sum(s_score) / (select count(*) from course) av,
       max(case when c_id = '01' then s_score end)  '语文',
       max(case when c_id = '02' then s_score end)  '数学',
       max(case when c_id = '03' then s_score end)  '英语'
from student s
         left join score sc on s.s_id = sc.s_id
group by s.s_id
order by av desc


分组过程中，对遍历到的每条数据，都会进行三次case  when 判断，则一个学生的三门成绩最终以三行存在，而各门课程的成绩应为三行中的最大值，所以应该使用max
~~~

10、查询各科成绩最高分、最低分和平均分：以如下形式显示：课程ID，课程name，最高分，最低分，平均分，及格率，中等率，优良率，优秀率 (及格为>=60，中等为：70-80，优良为：80-90，优秀为：>=90)

~~~sql
select c.c_id,
       c_name,
       max(s_score)                                                                                               '最高分',
       min(s_score)                                                                                               '最低分',
       avg(s_score),
       concat(round(sum(case when s_score >= 90 then 1 else 0 end) / count(s_id) * 100, 2), '%')                  '优秀率',
       concat(round(sum(case when s_score >= 80 and s_score < 90 then 1 else 0 end) / count(s_id) * 100, 2), '%') '优良率',
       concat(round(sum(case when s_score >= 70 and s_score < 80 then 1 else 0 end) / count(s_id) * 100, 2), '%') '中等率',
       concat(round(sum(case when s_score >= 60 then 1 else 0 end) / count(s_id) * 100, 2), '%')                  '及格率'
from course c
         left join score sc on c.c_id = sc.c_id
group by c.c_id

concat('','%')  -- 拼接
保留小数函数：
	round(x,d)  -- 四舍五入，d表示保留几位   x表示小数
	truncate(x,d) -- 截取几位小数  x：小数   d：截取几位小数	
~~~

11、查询每门科目成绩都在60分及以上的学生id，姓名，成绩

~~~sql
1. max(case when)

select s.s_id,
       s_name,
       max(case when c_id = (select c_id from course where c_name = '语文') then s_score end) chinese,
       max(case when c_id = (select c_id from course where c_name = '数学') then s_score end) math,
       max(case when c_id = (select c_id from course where c_name = '英语') then s_score end) english
from student s
         join score sc on s.s_id = sc.s_id
group by s.s_id
having chinese >= 60
   and math >= 60
   and english >= 60

或：
将成绩表视为3份，分别作为语文成绩表，且分数>=60   数学成绩表，且分数>=60   英语成绩表  且分数>=60

三张成绩表自连接，最后和学生表连接

select s.s_id, s_name, sc1.s_score '语文', sc2.s_score '数学', sc3.s_score '英语'
from student s
         join score sc1
         join score sc2
         join score sc3
              on sc1.s_id = sc2.s_id and sc2.s_id = sc3.s_id and sc1.s_id = s.s_id
where sc1.c_id = '01'
  and sc1.s_score >= 60
  and sc2.c_id = '02'
  and sc2.s_score >= 60
  and sc3.c_id = '03'
  and sc3.s_score >= 60
~~~

12、查询至少有一门科目成绩在90分以上的学生id，姓名，成绩 

~~~sql
select s.s_id,
       s_name,
       max(case when c_id = '01' then s_score end) '语文',
       max(case when c_id = '02' then s_score end) '数学',
       max(case when c_id = '03' then s_score end) '英语'
from student s
         join score sc on s.s_id = sc.s_id
group by sc.s_id
having max(s_score) > 90
~~~

13、查询所有科目成绩总和在240分及以上的学生id，姓名，和成绩总和，降序排列 

~~~sql
select s.s_id, s_name, sum(s_score) sum
from student s
         join score sc on s.s_id = sc.s_id
group by s.s_id
having sum >= 240
order by sum desc
~~~

14、查询每个科目成绩最高的学生的学生id，姓名，写在一个表里 

~~~sql
create table tname as select....

1. 查询每门科目的最高分
2. 根据科目id和对应的最高分到成绩表中查询对应的学生id
3. 根据学生id到学生表查询学生数据

create table new_table as
select s.s_id, s_name, tmp.c_id, tmp.max
from score sc
         join student s
         join (select c_id, max(s_score) max from score group by c_id) tmp
              on sc.c_id = tmp.c_id and sc.s_score = tmp.max and sc.s_id = s.s_id
~~~

15、查询每个科目成绩最低的学生的学生id，姓名 

16、查询目前没有安排课程的老师姓名 

~~~sql
思路:查询老师教授的课程,筛选课程id为null值的数据

select t_name from teacher t left join course c on t.t_id=c.t_id where c_id is null
~~~

17、将之前老师表的英文名字转化为大写 

~~~sql
转换大小写函数:
	upper(col)    lower(col)
update teacher set t_name=upper(t_name)
~~~

18、查询学生表中重复的姓名

~~~sql
姓名重复的判断:判断姓名出现的次数,若大于1,则重复
select s_name from student group by s_name having count(s_id)>1
~~~

19、统计各科成绩各分数段人数：课程编号,课程名称,[100-85],[85-70],[70-60],[0-60]及所占百分比

~~~sql
select c.c_id,
       c_name,
       count(s_id),
       sum(case when s_score >= 85 and s_score <= 100 then 1 else 0 end) '[100-85]',
       sum(case when s_score >= 70 and s_score < 85 then 1 else 0 end) '[85-70]',
       sum(case when s_score >= 60 and s_score < 70 then 1 else 0 end) '[70-60]',
       sum(case when s_score < 60 then 1 else 0 end) '[0-60]',
       concat(round(sum(case when s_score >= 85 and s_score <= 100 then 1 else 0 end) / count(s_id) * 100, 0),'%') '[100-85]百分比',
       concat(round(sum(case when s_score >= 70 and s_score < 85 then 1 else 0 end) / count(s_id) * 100, 0),'%')   '[85-70]百分比',
       concat(round(sum(case when s_score >= 60 and s_score < 70 then 1 else 0 end) / count(s_id) * 100, 0),'%')   '[70-60]百分比',
       concat(round(sum(case when s_score < 60 then 1 else 0 end) / count(s_id) * 100, 0), '%') '[0-60]百分比'
from course c
         left join score sc on c.c_id = sc.c_id
group by c.c_id
~~~