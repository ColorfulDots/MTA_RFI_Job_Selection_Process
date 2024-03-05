import { UserDataProps } from 'types';

export function getColorContrast(hexcolor: string) {
  // If a leading # is provided, remove it
  if (hexcolor.slice(0, 1) === '#') {
    hexcolor = hexcolor.slice(1);
  }

  // If a three-character hexcode, make six-character
  if (hexcolor.length === 3) {
    hexcolor = hexcolor
      .split('')
      .map((hex: any) => {
        return hex + hex;
      })
      .join('');
  }

  // Convert to RGB value
  let r = parseInt(hexcolor.substr(0, 2), 16);
  let g = parseInt(hexcolor.substr(2, 2), 16);
  let b = parseInt(hexcolor.substr(4, 2), 16);

  // Get YIQ ratio
  let yiq = (r * 299 + g * 587 + b * 114) / 1000;

  // Check contrast
  return yiq >= 128 ? '#000000' : '#ffffff';
}

// Uppercase String
export function upperCase(str: string | string[] | undefined) {
  return str?.toString().toUpperCase();
}

// Add Commas e.g $1,000
export function commaHelper(x: { toString: () => string }) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Slugify e.g. some-string-yeah
export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9']+/g, '-')
    .replace(/^-|-$/g, '')
    .replace(/[*+~%\<>/;.(){}?,'"!:@#^|]/g, '');
}

// Random Color String
export function randomColor() {
  return '#' + Math.random().toString(16).slice(2, 8).toUpperCase();
}

// Trim a long string
export function truncateString(str: string, num: number) {
  if (str?.length <= num) {
    return str;
  }
  return str?.slice(0, num) + '...';
}

// Check users roles
export function isAdmin(user: UserDataProps) {
  if (user?._admin) {
    return true;
  }
  return undefined;
}

export function isStaffing(user: UserDataProps) {
  if (user?._staffing) {
    return true;
  }
  return undefined;
}

export function isAssistant(user: UserDataProps) {
  if (user?._assistant) {
    return true;
  }
  return undefined;
}

export function roleCheck(user: UserDataProps) {
  if (user?._admin) {
    return 'ADMIN';
  }
  if (user?._staffing) {
    return 'STAFFING PARTNER';
  }
  if (user?._assistant) {
    return 'ASSISTANT';
  }
  return undefined;
}

// Format Date 2021-02-22 to 02/22/2021
export function formatDate(date: Date) {
  const dateString = new Date(date);
  return (
    dateString.getMonth() +
    1 +
    '/' +
    dateString.getDate() +
    '/' +
    dateString.getFullYear()
  );
}

export function float2int(value: number) {
  return value | 0;
}

export function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return float2int(Math.floor(Math.random() * (max - min + 1) + min)); //The maximum is inclusive and the minimum is inclusive
}

export function randomDate(start: Date, end: Date) {
  var diff = end.getTime() - start.getTime();
  var new_diff = diff * Math.random();
  var date = new Date(start.getTime() + new_diff);
  return date;
}
