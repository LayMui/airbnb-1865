Rails.application.routes.draw do
  devise_for :users


  root to: "listings#index"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
    # root "posts#index"
    resources :bookings, only: [:index, :show] do
      patch :accept, on: :member
    end

    resources :listings, only: [:index, :show, :new, :create] do
      resources :bookings, only: [:new, :create]
      member do
        post :bookmarks
      end
    end

  get "hostings", to: "hostings#index"
  get '/bookmarks', to: 'bookmarks#index', as: 'bookmarks'

  resources :bookings do
    resources :reviews, only: [:create]
  end

  match "/404", to: "errors#not_found", via: :all
  match "/500", to: "errors#internal_server_error", via: :all
  match "*path", to: "errors#not_found", via: :all

end
