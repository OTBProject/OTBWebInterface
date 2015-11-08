Rails.application.routes.draw do

  # Commands
  get 'dashboard/:channel/commands' => 'commands#index'
  get 'dashboard/:channel/commands/show' => 'commands#show'

  # User Levels
  get 'dashboard/user_levels' => 'dashboard#user_levels'

  # Aliases
  get 'dashboard/:channel/aliases' => 'aliases#index'
  get 'dashboard/:channel/aliases/show' => 'aliases#show'

  # Quotes
  get 'dashboard/:channel/quotes' => 'quotes#index'
  get 'dashboard/:channel/quotes/show' => 'quotes#show'

  root 'dashboard#index'

end
