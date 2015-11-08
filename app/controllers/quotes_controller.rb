class QuotesController < ApplicationController

  before_filter :setup_database, :check_auth

  def setup_database
    ActiveRecord::Base.establish_connection adapter: 'sqlite3', database: "#{::DIR_BASE}/data/channels/#{params[:channel]}/quotes.db"
  end


  # GET /quotes
  # GET /quotes.json
  def index

  end

  # GET /quotes/:user_level
  # GET /quotes/:user_level.json
  def show
    quotes = Quote.all
    quotes.to_a.sort!
    unless params[:quote].nil?
      @quotes = quotes
      return
    end
    render :partial => 'quotes', :object => quotes
  end

  # GET /quotes/new
  def new
  end

  # GET /quotes/1/edit
  def edit
  end

  # POST /quotes
  # POST /quotes.json
  def create

  end

  # PATCH/PUT /quotes/1
  # PATCH/PUT /quotes/1.json
  def update

  end

  # DELETE /quotes/1
  # DELETE /quotes/1.json
  def destroy

  end

end
