describe('Intelligent Registration System', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the registration form', () => {
    cy.get('h1').should('contain', 'Registration Form')
    cy.get('#registrationForm').should('be.visible')
  })

  it('should validate required fields', () => {
    cy.get('#submitBtn').should('be.disabled')

    // Fill some fields but not required ones
    cy.get('#firstName').type('John')
    cy.get('#submitBtn').should('be.disabled')

    // Fill all required fields
    cy.get('#lastName').type('Doe')
    cy.get('#email').type('john.doe@example.com')
    cy.get('#phone').type('+1234567890')
    cy.get('#male').check()
    cy.get('#terms').check()
    cy.get('#submitBtn').should('not.be.disabled')
  })

  it('should show error for invalid email', () => {
    cy.get('#email').type('test@tempmail.com')
    cy.get('#email').blur()
    cy.get('#emailError').should('contain', 'not disposable')
  })

  it('should check password strength', () => {
    cy.get('#password').type('weak')
    cy.get('#strengthText').should('contain', 'Weak')

    cy.get('#password').clear().type('Medium123')
    cy.get('#strengthText').should('contain', 'Medium')

    cy.get('#password').clear().type('Strong123!')
    cy.get('#strengthText').should('contain', 'Strong')
  })

  it('should validate password confirmation', () => {
    cy.get('#password').type('password123')
    cy.get('#confirmPassword').type('different')
    cy.get('#confirmPassword').blur()
    cy.get('#confirmPasswordError').should('contain', 'do not match')
  })

  it('should submit form successfully', () => {
    // Mock successful response
    cy.intercept('POST', 'process.php', { success: true, message: 'Registration successful' }).as('submitForm')

    // Fill all required fields
    cy.get('#firstName').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('#email').type('john.doe@example.com')
    cy.get('#phone').type('+1234567890')
    cy.get('#age').type('25')
    cy.get('#male').check()
    cy.get('#address').type('123 Main St')
    cy.get('#country').select('IN')
    cy.get('#password').type('Strong123!')
    cy.get('#confirmPassword').type('Strong123!')
    cy.get('#terms').check()

    // Submit form
    cy.get('#submitBtn').click()

    cy.wait('@submitForm')
    // Check for success message
    cy.get('#alert').should('be.visible').and('contain', 'Registration Successful')
  })

  it('should handle form submission error', () => {
    // Mock server error
    cy.intercept('POST', 'process.php', { statusCode: 500, body: { success: false, message: 'Server error' } }).as('submitForm')

    // Fill form
    cy.get('#firstName').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('#email').type('john.doe@example.com')
    cy.get('#phone').type('+1234567890')
    cy.get('#male').check()
    cy.get('#terms').check()

    cy.get('#submitBtn').click()

    cy.wait('@submitForm')
    cy.get('#alert').should('be.visible').and('contain', 'error occurred')
  })
})
