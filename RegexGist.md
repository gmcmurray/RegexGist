# Regex for email verification

Introductory paragraph (replace this with your text)

## Summary

Regex is shorthand for Regular Expression and has many applications for detecting text patterns in strings. Regular Expressions are used in many other languages (e.g. Python, Java, ...) including Javascript.  This tutorial works with the Javascript implementation of Regex.

There are two aspects of Regex which will be covered in this tutorial.
First we review the regular expression object and it's syntax and secondly a brief introduction to the methods associated with the regular expression object. 

For the tutorial a Regular Expression validating email formats will be used.  The goal for this Regex application is to detect the existence of three substrings separated be a single "@" and another "." character in the submited email.  The text prior to "@" is called the email prefix, while the text to right of "@" is the email domain.  


## Table of Contents
- [Regex Components](#background)
- [Anchors](#anchors)
- [Quantifiers](#quantifiers)
- [Grouping Constructs](#grouping-constructs)
- [Character Classes](#character-classes)
- [Character Escapes](#character-escapes)
- [Putting It All Together](#puttingitalltogether)
- [Additional Resources](#additionalresources)
- [About Author](#aboutauthor)

=============================================


## Regex Components <a id=background></a>

The regular expression is a composition of constraints that are used to define the desired pattern to be searched for.    Below is the particular Regex expression used for email validation we will be examining.

The literal creation of a regular expression.
 
```
1) const  reg_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;

equivalently using a constructor function:

2) let reg_email = new RegExp(' ^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$ ');
 ```

The Regex object reg_email defines a pattern which will be used to search for in a character string.  The expression looks complicated, however we will be breaking down each component to reveal what the pattern being defined.  The Regex object has two methods include exec() and test()and works with string methods match(), matchAll(), replace(), replaceAll(), search() and split().   We will use the test() method in this tutorial so in Javascript code you would see the our reg_email testing an input_email in the following syntax:

```
3) let isValid = reg_email.test(input_email);
```
Where isValid is a boolean which is true when the input_email string complies with the regular expression rules setup in reg_email.
Regex expressions are flexible and allow for searching general patterns in a text string.   

The Regular expression starts and ends with a forward slash "/" highlighted in yellow below. The characters "@" and "." are defined in green in the Regex reg_email and defining the requirement that these be in the string  with "@" occuring before "." .

<span style="color:yellow">/</span>^\w+([\.-]?\w+)\*<span style="color:green">@</span>\w+([\.-]?\w+)\*( <span style="color:green">\\.</span>\w{2,3})+$<span style="color:yellow">/</span>

The "." character is represnted "\\." or escape sequence as the Regex pattern is a string.


Additional pattern definition elements are covered in subsequent sections. 

================================================

### Anchors  <a id=anchors></a>
We will use the declaration of reg_email as shown in equation 1.    The next characters inside the forward slashes are called Anchors and they define boundaries for the pattern being defined.  The "^" defines the beginning and "$" the end of the String. 

<span style="color:yellow">/</span><span style="color:red">^</span>\w+([\.-]?\w+)\*<span style="color:green">@</span>\w+([\.-]?\w+)\*(<span style="color:green">\\.</span>\w{2,3})+<span style="color:red">$</span><span style="color:yellow">/</span>

Other Anchors exist but are not used in this particular Regex expression 

======================================

### Quantifiers  <a id=quantifiers></a>

Quantifiers define the number (or range) of characters that are to be matched.  Quantifiers characters substrings include *, +, ? , {num1,num2}. The * quantifier allows any number of matches (including 0 ) of the preceding subexpression.  The + quantifier looks for any number of nonzero matches (one or more) of the preceding subexpression. The ? matches the preceding subexpression 0 or 1 times.  The quantifier {num1,num2} provides a range for the occurences to be between num1 < num2.

In our expression we have several quantifier expressions (colored in aqua) and are preceded by an expression, in most cases this is "\w" which denotes any letter wild card.
The "\w+" is repeated four times and denotes that a substring should occur in this position composed of any letter and of any length.

The  "\w{2,3}" expression denotes a word composed of letters of length between 2-3 characters.    As this expression is preceded "\." it defines a "." followed by 2-3 letters.  Common substrings of this type in emails include : ".com",".edu", ".org" and ".de".

<span style="color:yellow">/</span><span style="color:red">^</span>
\w<span style="color:aqua">+</span>([\.-]<span style="color:aqua">?</span>
\w<span style="color:aqua">+</span>)\*<span style="color:green">@</span>
\w<span style="color:aqua">+</span>([\.-]
<span style="color:aqua">?</span>
\w<span style="color:aqua">+</span>)\*( <span style="color:green">\\.</span>
\w<span style="color:aqua">{2,3}</span>)+<span style="color:red">$</span><span style="color:yellow">/</span>

Note with a "+?" quantifier grouping this would force the match to exactly one occurence.

===============================

### Grouping Constructs <a id="grouping-constructs"></a>


Grouping Constructs are used to define subexpressions in the regular expression.  They are used in working with repeating subexpressions and along with quantifiers can target multiple instances of the subexpression.  They are also useful in clarifying code by grouping complex expressions.  

The grouped subexpression in our example are placed in between "(" and ")" or "[",  "]" brackets.  The () are denoted as capturing subexpressions while [] groups are used to find range of characters using hyphens (e.g. [a-g] is includes any char between a and g as a match). The group [.-]
includes period and a hyphen.
Our reg_email we have three grouping Constructs designated in orange along with two nested subexpressions in [ ] which are denoted in  brown.  

<span style="color:yellow">/</span><span style="color:red">^</span>
\w<span style="color:aqua">+</span>
<span style="color:orange">(</span><span style="color:orange">[</span>\.-<span style="color:orange">]</span>? \w<span style="color:aqua">+</span>
<span style="color:orange">)</span>
\*<span style="color:green">@</span>
<span style="color:aqua">\w+</span>
<span style="color:orange">(</span>
<span style="color:orange">[</span> 
    \.-
<span style="color:orange">]</span>     
    ?
<span style="color:aqua">\w+</span>
<span style="color:orange">)</span>
\*
<span style="color:orange">(</span>
<span style="color:green">\\.</span>
<span style="color:aqua">\w{2,3}</span>
<span style="color:orange">)</span>
+<span style="color:red">$</span><span style="color:yellow">/</span>

============================

### Character Classes  <a id= "character-classes"></a>


Character expressions are elements of a regex expression that  setup the which or what is being looked for in the pattern.

Here is a quick summary of some of the character expressions:

.     : Looks for any character except newline 

\w, \d, \s : Looks for a word, digit  whitespace respectively.

\W, \D, \S : the negation of \w, \d, \s

[abc] : includes a letter which is a,b, or c

[0-9] : A digit between 0 and 9.

[.-] : includes any letter or hyphen.

### Character Escapes  <a id= "character-escapes"></a>

Some characters require an escape backslash in order that it not be confused for a quantifier or other reserved character in regex.  For example
the period character requires a backslash in front of it "\\.". This avoids any confusion with the "." quantifier for any character except a newline.

The backslash is called an escape character.   To identify the backslash itself in text then this is written as "\\\\" in the regex expression.


### Putting It All Together <a id= "puttingitalltogether"></a>

The reg_email regex expression can be divided into two
parts : email prefix @ email domain which are covered in the following subexpressions:

email prefix = \w+([\.-]?\w+)*

email domain =  @\w+([\.-]?\w+)*(\.\w{2,3})+$/ 

email prefix is defined as multiple words (\w+) followed by a sequence of string of characters which may include one hypen ([\.-]?)* at terminates on the @ character.

The email domain is composed of two parts to the right of the @ character and separated by the . character.  The subexpression before the .  is the same as the email prefix, while the subexpression to the right of the . is defined to be a 2-3 character long string which could also be chained multiple times with additional period characters.  This is a result of the (\.\w{2,3})+ grouping expression enclosed by the () followed by the + quantifier.


## Testing 

The following tests were run on the regex expression discussed:

![image info](./tests.png)


## Additional Resources on Regex <a id= "additionalresources"></a>
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp

https://regexr.com/

## Author <a id= "aboutauthor"></a>

The author is a Full Stack student with the University of Washington BootCamp course and has extensive experience in Semiconductor Design, Development, Manufacturing Logistics and Quality.

My linked in profile can be found:

https://www.linkedin.com/in/george-mcmurray/

Email Contact Info:



gmcmurray1493@gmail.com

My github username is : gmcmurray

