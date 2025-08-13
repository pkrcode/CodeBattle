# Security Policy 🔒

## Supported Versions

We are committed to providing security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security issue, please follow these steps:

### 1. **DO NOT** create a public GitHub issue
- Security vulnerabilities should be reported privately
- Public issues can expose users to potential attacks

### 2. Report via Email
Send a detailed report to: `security@codebattle.com`

### 3. Include in Your Report
- **Description**: Clear description of the vulnerability
- **Impact**: Potential impact on users and data
- **Steps to Reproduce**: Detailed steps to reproduce the issue
- **Proof of Concept**: If possible, include a proof of concept
- **Suggested Fix**: If you have ideas for fixing the issue

### 4. Response Timeline
- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Resolution**: As quickly as possible, typically within 30 days

## Security Features

### Authentication & Authorization
- Firebase Authentication with email/password
- Role-based access control (User, Admin, Superadmin)
- Protected routes and API endpoints
- Session management and secure logout

### Data Protection
- Input validation and sanitization
- XSS protection
- CSRF protection
- Secure data transmission (HTTPS)

### Admin Security
- Superadmin protection (cannot be demoted/deleted)
- Admin role verification
- Secure admin dashboard access

## Best Practices

### For Users
- Use strong, unique passwords
- Enable two-factor authentication if available
- Keep your browser and extensions updated
- Report suspicious activity immediately

### For Developers
- Follow secure coding practices
- Regular security audits
- Keep dependencies updated
- Implement proper input validation

## Disclosure Policy

When a security vulnerability is fixed:
1. A security advisory will be published
2. Users will be notified through appropriate channels
3. The fix will be included in the next release
4. Credit will be given to the reporter (if desired)

## Contact

For security-related questions or concerns:
- **Email**: security@codebattle.com
- **Response Time**: Within 48 hours

Thank you for helping keep CodeBattle secure! 🛡️
