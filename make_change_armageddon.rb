require 'terminal-table'

$combs = []

def find_combinations(cents, i, coins, add)
  if !!add
    coins << add
  end
  if cents == 0 || i + 1 == $values.length
    if cents > 0 && i + 1 == $values.length
      coins << (cents / $values[i]).floor
      i += 1
    end
    while i < $values.length
      coins << 0
      i += 1
    end
    $combs << coins
    return 1
  end
  curr = $values[i]
  (0..(cents / curr)).each do |x|
    find_combinations(cents - (x * curr), i + 1, coins.dup, x)
  end
end

def format_values(answer)
  ans = answer.split(",")
  values = []
  names = {}
  i = 0
  while i < ans.length - 1
    n = ((100 / ans[i + 1].to_f) * 10000).floor / 10000.0
    names[n] = ans[i]
    values << n
    i += 2
  end
  $values = values.sort{ |a, b| b - a }
  $names = values.map{ |val| names[val] }
end

def prompt(*args)
  puts(*args)
  gets.strip
end

def dollar_to_cents(amount)
  cents = amount.to_f * 100
end

def create_new_table(headings, rows)
  width = headings.join("     ").length + 10
  table = Terminal::Table.new(
    title: 'Change Combinations',
    headings: headings,
    rows: rows,
    style: {
      :width => width,
      :padding_left => 3,
      :border_x => "="
    }
  )
  headings.each_with_index{ |h, i| table.align_column(i, :center) }
  table
end

if prompt("Has the Fed collapsed? 'Y or N': ").downcase == 'y'
  values_string = prompt(
    'Input new denominations and how much is needed of each to total one dollar',
    "'Quarter,4,Dime,10,Nickel,20,Penny,100'",
    'Comma seperated with no spaces: '
  )
  dollar_amount = prompt("How much money would you like to break?: ")
  format_values(values_string)
  find_combinations(dollar_to_cents(dollar_amount), 0, [], nil)
  table = create_new_table($names, $combs)
  puts table
  puts "\nCount: #{$combs.length}\n\n"
else
  dollar_amount = prompt("How much money would you like to break?: ")
  format_values('Quarter,4,Dime,10,Nickel,20,Penny,100')
  find_combinations(dollar_to_cents(dollar_amount), 0, [], nil)
  table = create_new_table($names, $combs)
  puts table
  puts "\nCount: #{$combs.length}\n\n"
end

# string = 'Quarter,4,Dime,10,Nickel,20,Penny,100'

# string = 'Coin,1.5,Arrowhead,3,Button,150'

# string = 'Half Dollar,2,Quarter,4,Dime,10,Nickel,20,Penny,100'
